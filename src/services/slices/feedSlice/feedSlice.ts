import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { IFeedState } from './feedSlice.typings';

export const getFeedThunk = createAsyncThunk<TOrdersData>(
  `feed/getFeed`,
  async () => getFeedsApi()
);

export const initialState: IFeedState = {
  isLoading: false,
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeed: (sliceState: IFeedState) => sliceState.feed,
    selectOrdersFeed: (sliceState: IFeedState) => sliceState.feed.orders,
    selectLoadFeed: (sliceState: IFeedState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        getFeedThunk.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.feed = action.payload;
        }
      );
  }
});

export const { selectFeed, selectOrdersFeed, selectLoadFeed } =
  feedSlice.selectors;
