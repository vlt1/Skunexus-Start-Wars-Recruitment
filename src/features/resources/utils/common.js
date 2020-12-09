import { some } from 'lodash';

export const resourceTypes = [
  'films',
  'people',
  'planets',
  'species',
  'starships',
  'vehicles'
];


export const isValidResourceType = type => !!type && some(resourceTypes, validType => validType === type);
export const isValidResource = resource => !!resource && !!resource.id && isValidResourceType(resource.type);

export const makeResourceDescFromUrl = (url) => {
  if (!url) {
    return null;
  }

  const apiIndex = url.indexOf('/api/');
  if (apiIndex === -1) {
    return null;
  }
  const typeIdSlice = url.slice(apiIndex + 5);
  const typeEndIndex = typeIdSlice.indexOf('/');
  const regExp = /[^/?#]+?((?=[/?#])|$)/;

  return {
    type: typeIdSlice.match(regExp)?.[0],
    id: (typeEndIndex > -1 && typeIdSlice.slice(typeEndIndex + 1).match(regExp)?.[0]) || undefined
  };
}

export const makeResourceDescsFromUrls = (urls) => urls?.map(makeResourceDescFromUrl);

export const makeSimpleError = (message) => ({error: {message}});
export const makeErrorFromFailedAjax = ({status, timeout}) => ({error: {message: timeout ? 'Request timed out' : `Request failed with status: ${status}`}});
