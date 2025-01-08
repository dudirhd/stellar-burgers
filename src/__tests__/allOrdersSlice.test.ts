import {
  allOrdersSlice,
  initialState,
  getOrdersThunk,
  selectOrders
} from '../services/slices/allOrdersSlice/allOrdersSlice';
import { TOrder } from '@utils-types';

// Тестовые данные для заказов
const ordersMock: TOrder[] = [
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
];

describe('allOrdersSlice', () => {
  // Проверка начального состояния
  it('должен вернуть начальное состояние', () => {
    const state = allOrdersSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  // Проверка pending состояния
  it('должен установить isLoading в true при getOrdersThunk.pending', () => {
    const action = { type: getOrdersThunk.pending.type };
    const state = allOrdersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  // Проверка rejected состояния
  it('должен установить isLoading в false при getOrdersThunk.rejected', () => {
    const action = { type: getOrdersThunk.rejected.type };
    const state = allOrdersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  // Проверка fulfilled состояния
  it('должен загрузить заказы и установить isLoading в false при getOrdersThunk.fulfilled', () => {
    const action = {
      type: getOrdersThunk.fulfilled.type,
      payload: ordersMock
    };
    const state = allOrdersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(ordersMock);
  });

  // Проверка селектора selectOrders
  it('должен корректно выбирать заказы с помощью selectOrders', () => {
    const state = { allOrders: { ...initialState, orders: ordersMock } };
    expect(selectOrders(state)).toEqual(ordersMock);
  });
});
