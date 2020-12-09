import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import resources from './features/resources/slice';

const reducers = {
  resources
};
const rootReducer = combineReducers(reducers);

const store = configureStore({reducer: rootReducer});

export default store;
