import './TablePage.css';

import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ResourceModal from '../ResourceModal';
import ResourceGridWithPagination from '../ResourceGridWithPagination';

import { makeResourceDescFromUrl } from '../../utils/common'
import { defaultHeaders, makeTablePageTitle, substituteHeaders } from '../../utils/table';

const TablePage = ({makeTitle = () => {}}) => {
  const {type, page} = useParams();
  const history = useHistory();
  const [showResourceModal, setShowResourceModal] = React.useState(false);
  const [resourceModalId, setResourceModalId] = React.useState();

  const title = makeTitle(type) ?? makeTablePageTitle(type);

  const getData = (name, data) => data[name].length;
  const changedHeaders = [
    {
      name: '@actions',
      type: 'actions',
      actions: [
        ...defaultHeaders.planets.find(value => value?.name === '@actions')?.actions,
        (data) => ({
          id: 'show-resource-modal',
          label: 'Show Resource Modal',
          onClick: () => {
            const {id} = makeResourceDescFromUrl(data.url);
            setResourceModalId(id);
            setShowResourceModal(true);
          }
        })
      ]
    },
  ];
  const substitutedPlanetHeaders = substituteHeaders(defaultHeaders.planets, changedHeaders);
  const headers = {
    ...defaultHeaders,
    planets: [
      ...substitutedPlanetHeaders.slice(0, substitutedPlanetHeaders.length - 1),
      {
        name: 'residents',
        getData 
      },
      {
        name: 'films',
        getData
      },
      substitutedPlanetHeaders[substitutedPlanetHeaders.length - 1]
    ]
  };

  useEffect(() => {
    setShowResourceModal(false);
    setResourceModalId();
  }, [type, page, setShowResourceModal, setResourceModalId]);

  return (
    <div className="tablePage">
      <div className="title">{title}</div>
      <ResourceGridWithPagination type={type} page={page} headers={headers} onChangePage={newPage => history.push(`/table/${type}/page/${newPage || 1}`)}/>
      <ResourceModal show={showResourceModal} type={type} id={resourceModalId} onClose={() => {
        setShowResourceModal(false);
        setResourceModalId();
      }}/>
    </div>
  );
};

export default TablePage;
