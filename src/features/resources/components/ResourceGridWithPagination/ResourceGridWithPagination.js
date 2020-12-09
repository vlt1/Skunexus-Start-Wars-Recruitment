import React from 'react'
import { shallowEqual } from 'react-redux';
import classnames from 'classnames';

import { useResourcesFromPage } from '../../hooks';
import { useSelectorCreator } from '../../../../common/hooks';
import { makePageFieldSelector } from '../../selectors';

import ResourceGrid from '../ResourceGrid';
import Toolbar from '../../../../common/components/Toolbar';

const ResourceGridWithPaginationToolbar = ({
  type,
  page = 1,
  headers,
  className,
  onChangePage = () => {}
}) => {
  const prev = useSelectorCreator(makePageFieldSelector, [type, page, 'prev'], shallowEqual);
  const next = useSelectorCreator(makePageFieldSelector, [type, page, 'next'], shallowEqual);
  const {
    fetching,
    error,
    resourceIds
  } = useResourcesFromPage(type, page);

  const toolbarItems = [{
    id: 'prev',
    label: 'Back',
    disabled: !prev?.page,
    onClick: () => {
      onChangePage(prev?.page)
    }
  }, {
    id: 'next',
    label: 'Next',
    disabled: !next?.page,
    onClick: () => {
      onChangePage(next?.page)
    }
  }];

  return (
    <div className={classnames("resourceGridWithPagination", className)}>
      <div className="currentPage">Page: {page}</div>
      <ResourceGrid type={type} headers={headers} fetching={fetching} error={error} resourceIds={resourceIds}/>
      <Toolbar items={toolbarItems}/>
    </div>
  );
};

export default ResourceGridWithPaginationToolbar;
