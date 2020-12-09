import './Toolbar.css';

import React from 'react';
import classnames from 'classnames';

import ToolbarButton from '../Toolbar/ToolbarButton';

const Toolbar = ({
  items = [],
  className
}) => {
  return (
    <div className={classnames('toolbar', className)}>
      {items.map(({id, label, component = ToolbarButton, ...props}) => {
        const Component = component;
        return <Component key={id} {...props}>{label}</Component>;
      })}
    </div>
  );
};

export default Toolbar;
