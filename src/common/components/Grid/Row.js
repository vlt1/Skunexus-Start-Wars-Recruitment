import React from 'react';

import { makeCellsFromHeader } from '../../utils';

const Row = ({
  header,
  data
}) => {
  return (
    <tr>
      {makeCellsFromHeader(data, header)}
    </tr>
  );
};

export default Row;
