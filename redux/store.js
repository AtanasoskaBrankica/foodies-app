import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import mealReducer from './slice/mealSlice';

const reducer = combineReducers({
  auth: authReducer,
  meal: mealReducer,
});

const store = configureStore({
  reducer,
  //   middleware: getDefaultMiddleware =>
  //     getDefaultMiddleware({
  //       serializableCheck: false,
  //     }),
});

export default store;
