import React from 'react';
import { zip } from 'lodash';

import { makeCellsFromHeader } from '../../../../common/utils';

const DetailsTable = ({
  data,
  header = [],
}) => {
  const cells = makeCellsFromHeader(data, header);

  return (
    <table className="detailsTable">
      <tbody>
        {zip(header, cells).map(([row, cell]) => {
          return (
            <tr key={row.name}>
              <td className="detailsRowLabel">{row.name || row.label}</td>
              {cell}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DetailsTable;
