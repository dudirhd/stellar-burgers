import {
  feedSlice,
  initialState,
  getFeedThunk,
  selectFeed,
  selectOrdersFeed,
  selectLoadFeed
} from '../services/slices/feedSlice/feedSlice';
import { TOrdersData } from '@utils-types';

// Моковые данные для заказа
const feedMock: TOrdersData = {
  orders: [
    {
      _id: '67610735750864001d371d27',
      status: 'done',
      name: 'Краторный бургер',
      createdAt: '2024-12-17T05:08:05.934Z',
      updatedAt: '2024-12-17T05:08:06.883Z',
      number: 62983,
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c']
    },
    {
      _id: '6761073f750864001d371d28',
      status: 'pending',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-12-17T05:08:15.117Z',
      updatedAt: '2024-12-17T05:08:16.051Z',
      number: 62984,
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ]
    }
  ],
  total: 100,
  totalToday: 10
};

describe('feedSlice', () => {
  // Проверка начального состояния
  it('должен вернуть начальное состояние', () => {
    const state = feedSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  // Проверка состояния pending
  it('должен установить isLoading в true при getFeedThunk.pending', () => {
    const action = { type: getFeedThunk.pending.type };
    const state = feedSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  // Проверка состояния rejected
  it('должен установить isLoading в false при getFeedThunk.rejected', () => {
    const action = { type: getFeedThunk.rejected.type };
    const state = feedSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  // Проверка состояния fulfilled
  it('должен загрузить фид и установить isLoading в false при getFeedThunk.fulfilled', () => {
    const action = {
      type: getFeedThunk.fulfilled.type,
      payload: feedMock
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.feed).toEqual(feedMock);
  });

  // Проверка селектора selectFeed
  it('должен корректно выбирать фид с помощью selectFeed', () => {
    const state = { feed: { ...initialState, feed: feedMock } };
    expect(selectFeed(state)).toEqual(feedMock);
  });

  // Проверка селектора selectOrdersFeed
  it('должен корректно выбирать заказы с помощью selectOrdersFeed', () => {
    const state = { feed: { ...initialState, feed: feedMock } };
    expect(selectOrdersFeed(state)).toEqual(feedMock.orders);
  });

  // Проверка селектора selectLoadFeed
  it('должен корректно возвращать состояние загрузки с помощью selectLoadFeed', () => {
    const state = { feed: { ...initialState, isLoading: true } };
    expect(selectLoadFeed(state)).toBe(true);
  });
});
