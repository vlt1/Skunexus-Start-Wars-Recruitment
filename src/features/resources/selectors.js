export const makeResourceSelector = (resourceType, resourceId) => (state) =>
  resourceType &&
  resourceId &&
  state.resources?.[resourceType]?.resourcesById?.[resourceId];

export const makeResourceFieldSelector = (resourceType, resourceId, field) => (state) =>
  resourceType &&
  resourceId &&
  field &&
  state.resources?.[resourceType]?.resourcesById?.[resourceId]?.data?.[field];

export const makeResourceFetchingSelector = (resourceType, resourceId) => (state) =>
  resourceType &&
  resourceId &&
  state.resources?.[resourceType]?.resourcesById?.[resourceId]?.fetching;

export const makeResourceErrorSelector = (resourceType, resourceId) => (state) =>
  resourceType &&
  resourceId &&
  state.resources?.[resourceType]?.resourcesById?.[resourceId]?.error;

export const totalCountOfResourcesByTypeSelector = (resourceType) => (state) =>
  resourceType &&
  state.resource?.[resourceType]?.totalCount;

export const makePageFieldSelector = (resourceType, page, field) => (state) =>
  resourceType &&
  page &&
  field &&
  state.resources?.[resourceType]?.pages?.[page]?.[field];
