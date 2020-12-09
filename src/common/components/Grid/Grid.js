import './Grid.css';

import React from 'react';
import classnames from 'classnames';

const Grid = ({
  header,
  className,
  children
}) => {
  return (
    <table className={classnames('gridTable', className)}>
      <thead>
        <tr>
          {header.map(({name, label}) => <th key={name}>{label ?? name}</th>)}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  );
};

export default Grid;
