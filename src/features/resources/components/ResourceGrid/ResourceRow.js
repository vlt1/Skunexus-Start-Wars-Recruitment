import React from 'react';

import Fetching from './Fetching';
import Error  from './Error';
import Row from '../../../../common/components/Grid/Row';

import { useResource } from '../../hooks';

const ResourceRow = ({
  type,
  id,
  header
}) => {
  const resource = useResource(type, id);

  if (!resource || resource.fetching) {
    return <tr><td colSpan={header.length}><Fetching/></td></tr>;
  }
  if (resource.error) {
    return <tr><td className="error-cell" colSpan={header.length}><Error error={resource.error}/></td></tr>;
  }

  return <Row key={id} header={header} data={resource.data}/>;
};

export default ResourceRow;
