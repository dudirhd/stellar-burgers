import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSlice } from './slices/authSlice/authSlice';
import { ingredientsSlice } from './slices/ingredientsSlice/ingredientsSlice';
import { burgerConstructorSlice } from './slices/constructorSlice/constructorSlice';
import { feedSlice } from './slices/feedSlice/feedSlice';
import { orderSlice } from './slices/orderSlice/orderSlice';
import { allOrdersSlice } from './slices/allOrdersSlice/allOrdersSlice';

export const rootReducer = combineReducers({
  ['user']: userSlice.reducer,
  ['ingredients']: ingredientsSlice.reducer,
  ['burgerConstructor']: burgerConstructorSlice.reducer,
  ['feed']: feedSlice.reducer,
  ['allOrders']: allOrdersSlice.reducer,
  ['order']: orderSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
