import {
  getOrderByNumberApi,
  orderBurgerApi,
  TNewOrderResponse,
  TOrderResponse
} from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { resetConstructor } from '../constructorSlice/constructorSlice';
import { IOrderState } from './orderSlice.typings';

export const createOrderBurgerThunk = createAsyncThunk(
  `order/createOrderBurger`,
  async (id_ingredients: string[], { dispatch }) => {
    dispatch(resetConstructor());
    return orderBurgerApi(id_ingredients);
  }
);

export const getOrderByNumberThunk = createAsyncThunk(
  `order/getOrderByNumber`,
  async (id_order: number) => getOrderByNumberApi(id_order)
);

export const initialState: IOrderState = {
  isLoading: false,
  order: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    selectOrder: (sliceState: IOrderState) => sliceState.order,
    selectLoadOrder: (sliceState: IOrderState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderBurgerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrderBurgerThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        createOrderBurgerThunk.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.isLoading = false;
          state.order = action.payload.order;
        }
      )

      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumberThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        getOrderByNumberThunk.fulfilled,
        (state, action: PayloadAction<TOrderResponse>) => {
          state.isLoading = false;
          state.order = action.payload.orders[0];
        }
      );
  }
});

export const { selectLoadOrder, selectOrder } = orderSlice.selectors;

export const { resetOrder } = orderSlice.actions;
