import {configureStore} from '@reduxjs/toolkit';

import combineReducer from './combineReducer';
export const store = configureStore({
  reducer: combineReducer,
});
