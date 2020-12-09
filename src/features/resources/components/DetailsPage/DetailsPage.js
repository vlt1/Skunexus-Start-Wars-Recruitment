import '../TablePage/TablePage.css';
import '../ResourceGrid/ResourceGrid.css'
import './DetailsPage.css';

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { toPairs, isArray } from 'lodash';

import { useResource } from '../../hooks';
import { makeResourceDescFromUrl } from '../../utils/common';
import { makeDetailsPageTitle } from '../../utils/details';

import DetailsTable from '../DetailsTable';
import Fetching from '../ResourceGrid/Fetching';
import Error from '../ResourceGrid/Error';

const DetailsResourceListLink = ({
  type,
  source
}) => {
  const buttonTitle = `Go to ${source.field[0].toUpperCase()}${source.field.slice(1)}`;

  return type ?
    (<Link to={`/table/${type}/source/${source.resourceType}/${source.resourceId}/${source.field}`}>
      <button>{buttonTitle}</button>
    </Link>) :
    <button disabled>{buttonTitle}</button>;
};

const DetailsPage = ({
  makeTitle = () => {}
}) => {
  const {type, id} = useParams();
  const resource = useResource(type, id);

  const title = makeTitle(type, resource) ?? makeDetailsPageTitle(type, resource);
  const fetching = !resource || resource.fetching;
  const header = !fetching && toPairs(resource.data).filter(([key]) => key !== 'url').map(([key, value]) => {
    let getData;

    if (isArray(value)) {
      getData = (_, data) => {
        const desc = data[key]?.[0] ? makeResourceDescFromUrl(data[key][0]) : {};

        return <DetailsResourceListLink type={desc.type} source={{resourceType: type, resourceId: id, field: key}}/>;
      };
    }

    return {
      name: key,
      getData
    };
  });

  return (
    <div className="tablePage">
      {title ? <div className="title">{title}</div> : null}
      {fetching ?
        <Fetching/> :
          resource?.error ?
            <Error error={resource.error}/> :
            <DetailsTable data={resource.data} header={header}/>}
    </div>
  );
};

export default DetailsPage;
