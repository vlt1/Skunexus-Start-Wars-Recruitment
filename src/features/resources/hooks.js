import { useEffect } from 'react';
import { useDispatch, shallowEqual } from 'react-redux';

import { useSelectorCreator } from '../../common/hooks';
import {
  makeResourceSelector,
  makeResourceFieldSelector,
  makePageFieldSelector,
  makeResourceFetchingSelector,
  makeResourceErrorSelector
} from './selectors';
import { makeResourceDescsFromUrls, isValidResourceType } from './utils/common';
import { fetchResources, fetchResourcesFromList } from './async'

export const useStoredResource = (resourceType, resourceId) => {
  return useSelectorCreator(makeResourceSelector, [resourceType, resourceId], shallowEqual);
};

export const useFetchResource = (resourceType, resourceId) => {
  const dispatch = useDispatch();
  const sourceResourceUrl = useSelectorCreator(makeResourceFieldSelector, [resourceType, resourceId, 'url']);
  const fetchingSourceResource = useSelectorCreator(makeResourceFetchingSelector, [resourceType, resourceId]);
  const errorSourceResource = useSelectorCreator(makeResourceErrorSelector, [resourceType, resourceId]);

  useEffect(() => {
    if (!sourceResourceUrl && !fetchingSourceResource && !errorSourceResource) {
      fetchResourcesFromList(dispatch, [{type: resourceType, id: resourceId}]);
    }
  }, [dispatch, sourceResourceUrl, fetchingSourceResource, errorSourceResource, resourceType, resourceId]);
};

export const useResource = (resourceType, resourceId) => {
  useFetchResource(resourceType, resourceId);

  return useStoredResource(resourceType, resourceId);
};

export const useResourcesFromSource = (source = {}) => {
  useFetchResource(source.resourceType, source.resourceId);

  const fetchingSource = useSelectorCreator(makeResourceFetchingSelector, [source.resourceType, source.resourceId]);
  const sourceError = useSelectorCreator(makeResourceErrorSelector, [source.resourceType, source.resourceId]);
  const items = useSelectorCreator(makeResourceFieldSelector, [source.resourceType, source.resourceId, source.field], shallowEqual);
  const resourceIds = (items ? makeResourceDescsFromUrls(items) : []).filter(item => !!item).map(({id}) => id);

  return {
    fetchingSource,
    sourceError,
    resourceIds
  };
};

export const useResourcesFromPage = (resourceType, page) => {
  const fetchedIds = useSelectorCreator(makePageFieldSelector, [resourceType, page, 'fetchedIds']);
  const fetching = useSelectorCreator(makePageFieldSelector, [resourceType, page, 'fetching']);
  const error = useSelectorCreator(makePageFieldSelector, [resourceType, page, 'error']);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetching && !error && (!fetchedIds || !fetchedIds.length) && isValidResourceType(resourceType)) {
      fetchResources(dispatch, resourceType, page);
    }
  }, [dispatch, fetching, error, fetchedIds, resourceType, page]);

  return {
    fetching,
    error,
    resourceIds: fetchedIds
  };
};
