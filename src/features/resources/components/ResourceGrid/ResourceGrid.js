import React from 'react';

import Grid from '../../../../common/components/Grid';
import Toolbar from '../../../../common/components/Toolbar';
import Fetching from './Fetching';
import Error  from './Error';
import ResourceRow from './ResourceRow';

import { defaultHeaders, normalizeHeaders } from '../../utils/table';

import './ResourceGrid.css';

const ResourceGrid = ({
  type,
  fetching,
  error,
  headers = defaultHeaders,
  showActions = true,
  resourceIds = [],
}) => {
  let result;

  if (fetching) {
    result = <Fetching/>
  } else if (error) {
    result = <Error error={error}/>
  } else {
    const header = normalizeHeaders(headers[type])
      .filter(({name}) => showActions || name !== '@actions')
      .map(col => col.name === '@actions' ? ({
        name: col.name,
        type: col.type,
        label: 'Actions',
        getData: (_, data) => <Toolbar items={col.actions.map(action => action(data))}/>
      }) : col);

    result = (
      <Grid header={header}>
        {resourceIds.map(id => <ResourceRow key={id} type={type} id={id} header={header}/>)}
      </Grid>
    );
  }

  return result;
};

export default ResourceGrid;
