import { getOrdersApi } from '../../../utils/burger-api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { IAllOrdersState } from './allOrdersSlice.typings';

export const getOrdersThunk = createAsyncThunk(
  `allOrders/getOrders`,
  getOrdersApi
);

export const initialState: IAllOrdersState = {
  isLoading: false,
  orders: []
};

export const allOrdersSlice = createSlice({
  name: 'allOrders',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (sliceState: IAllOrdersState) => sliceState.orders,
    selectLoadOrders: (sliceState: IAllOrdersState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        getOrdersThunk.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      );
  }
});

export const { selectOrders } = allOrdersSlice.selectors;
