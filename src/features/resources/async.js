import { zip, isNil } from 'lodash';

import {
  resourcesFetchStarted,
  resourcesFetched
} from './slice';
import {
  makeSimpleError,
  makeErrorFromFailedAjax,
  makeResourceDescFromUrl
} from './utils/common';

import ajaxRequest from '../../ajax';

const badResponseDataError = makeSimpleError('Bad response data');

const makeFetchedResource = ({type, id}, {responseResult, error}, page) => ({
  type,
  id,
  fetchedData: responseResult?.response ?? undefined,
  page,
  error: error ?? (isNil(responseResult?.response) ? badResponseDataError : undefined)
});

export const fetchResources = (dispatch, resourceType, page) => {
  dispatch(resourcesFetchStarted({resourceTypes: [{type: resourceType, page}]}));

  ajaxRequest(`${resourceType}/${page > 1 ? `?page=${page}` : ''}`)
    .then(responseResult => {
      let resources, resourceTypes = [{type: resourceType}], totalCounts = [];
      if (isNil(responseResult?.response)) {
        resources = [];
        resourceTypes[0].error = badResponseDataError;
      } else {
        const results = responseResult.response.results;
        const nextPage = responseResult.response.next?.match(/page=.+?((?=&)|$)/)?.[0]?.split?.('=')?.[1];
        const prevPage = responseResult.response.previous?.match(/page=.+?((?=&)|$)/)?.[0]?.split?.('=')?.[1];
        const resultsDescs = results.map(({url}) => makeResourceDescFromUrl(url));

        resources = zip(resultsDescs, results).map(([resultDesc, result]) => makeFetchedResource(resultDesc, {responseResult: {response: result}}, page));
        resourceTypes[0].page = page;
        resourceTypes[0].next = {page: nextPage};
        resourceTypes[0].prev = {page: prevPage};
        totalCounts[0] = {
          type: resourceType,
          totalCount: responseResult.response.count
        };
      }

      dispatch(resourcesFetched({
        resources,
        resourceTypes,
        totalCounts
      }));
    }, reason => {
      dispatch(resourcesFetched({resourceTypes: [{type: resourceType, page, ...makeErrorFromFailedAjax(reason)}]}));
    });
};

export const fetchResourcesFromList = (dispatch, resourceDescs) => {
  dispatch(resourcesFetchStarted({resources: resourceDescs}));

  Promise.allSettled(resourceDescs.map(({type, id}) => ajaxRequest(`${type}/${id}`)))
    .then(results => dispatch(resourcesFetched({
      resources: zip(resourceDescs, results).map(([srcResDesc, {status, value, reason}]) =>
        makeFetchedResource(srcResDesc, status === 'fulfilled' ? {responseResult: value} : makeErrorFromFailedAjax(reason)))
    })));
};
