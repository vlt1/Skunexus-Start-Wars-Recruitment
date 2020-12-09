import './TablePage.css';

import React from 'react';
import { useParams } from 'react-router-dom';
import { isNil } from 'lodash';

import ResourceGrid from '../ResourceGrid';

import { useResourcesFromSource } from '../../hooks';
import { useSelectorCreator } from '../../../../common/hooks';
import { makeResourceFieldSelector } from '../../selectors';
import { makeTableWithSourcePageTitle } from '../../utils/table';

const TableWithSourcePage = ({makeTitle = () => {}}) => {
  const {type, sourceType, sourceId, sourceField} = useParams();
  const sourceName = useSelectorCreator(makeResourceFieldSelector, [sourceType, sourceId, 'name']);
  const {
    fetchingSource,
    sourceError,
    resourceIds
  } = useResourcesFromSource({resourceType: sourceType, resourceId: sourceId, field: sourceField});

  const title = type && sourceType && sourceName && (makeTitle(type, sourceType, sourceName) ?? makeTableWithSourcePageTitle(type, sourceType, sourceName));

  return (
    <div className="tablePage">
      {title ? <div className="title">{title}</div> : null}
      <ResourceGrid type={type} fetching={isNil(fetchingSource) || fetchingSource} error={sourceError} resourceIds={resourceIds} showActions={false}/>
    </div>
  );
};

export default TableWithSourcePage;
