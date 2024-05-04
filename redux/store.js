import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import mealReducer from './slice/mealSlice';
import filterReducer from './slice/filterSlice';

const reducer = combineReducers({
  auth: authReducer,
  meal: mealReducer,
  filter: filterReducer,
});

const store = configureStore({
  reducer,
  //   middleware: getDefaultMiddleware =>
  //     getDefaultMiddleware({
  //       serializableCheck: false,
  //     }),
});

export default store;
