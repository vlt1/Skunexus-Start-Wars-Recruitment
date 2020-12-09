export const makeDetailsPageTitle = (type, resource) => {
  if (!resource || resource?.fetching) {
    return 'Loading Details...'
  }

  let typeString;

  if (type === 'people') {
    typeString = 'person';
  } else if (type === 'species') {
    typeString = 'species'
  } else {
    typeString = `${type.slice(0, type.length -1)}`;
  }

  return `Details for ${typeString} ${resource?.data?.name ?? ''}`;
};
