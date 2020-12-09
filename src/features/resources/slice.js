import { createSlice } from '@reduxjs/toolkit';

import {
  resourceTypes,
  isValidResourceType,
  isValidResource
} from './utils/common';

const resourceSlice = createSlice({
  name: 'resources',
  initialState: resourceTypes.reduce((result, type) => ({
    ...result,
    [type]: {
      pages: {},
      resourcesById: {}
    }
  }), {}),
  reducers: {
    resourcesFetchStarted(state, action) {
      if (action.payload?.resources) {
        if (action.payload.resources.length > 0) {
          const resources = action.payload.resources.filter(isValidResource);

          resources.forEach(({type, id}) => {
            state[type].resourcesById[id] = {
              fetching: true
            };
          });
        }
      } else if (action.payload?.resourceTypes?.length > 0) {
        action.payload.resourceTypes.forEach(({type, page}) => {
          state[type].pages[page] = {
            fetching: true,
            error: undefined,
            fetchedIds: [],
            next: {},
            prev: {}
          };
        });
      }
    },
    resourcesFetched(state, action) {
      const resources = (action.payload?.resources || []).filter(isValidResource);
      const fetchedResourceTypes = (action.payload?.resourceTypes || []).filter(resType => !!resType && isValidResourceType(resType.type));
      const totalCounts = (action.payload?.totalCounts || []).filter(({type}) => !!type && isValidResourceType(type));

      resources.forEach(({type, id, fetchedData, page, error}) => {
        state[type].resourcesById[id] = {
          data: fetchedData,
          fetching: false,
          error
        };

        const fetchedIds = (page && state[type].pages[page]?.fetchedIds) || [];
        if (page && fetchedIds.findIndex(x => x === id) === -1) {
          fetchedIds.push(id);
        }
      });

      fetchedResourceTypes.forEach(({type, page, error, prev, next}) => {
        if (!state[type].pages[page]) {
          state[type].pages[page] = {}
        }
        state[type].pages[page].fetching = false;
        state[type].pages[page].error = error;
        state[type].pages[page].prev = prev;
        state[type].pages[page].next = next;
      });

      totalCounts.forEach(({type, totalCount}) => {
        state[type].totalCount = totalCount
      });
    }
  }
});

export const {
  resourcesFetchStarted,
  resourcesFetched
} = resourceSlice.actions;

export default resourceSlice.reducer;
