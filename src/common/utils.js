import classnames from 'classnames';

export const makeCellsFromHeader = (data, header) =>
  header.map(({name, type, getData = (name, data) => data[name]}) => <td key={name} className={classnames('gridCell', type)}>{getData(name, data)}</td>);
