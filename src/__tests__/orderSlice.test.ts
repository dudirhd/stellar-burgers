import { TNewOrderResponse, TOrderResponse } from '@api';
import {
  orderSlice,
  initialState,
  createOrderBurgerThunk,
  getOrderByNumberThunk,
  resetOrder,
  selectOrder,
  selectLoadOrder
} from '../services/slices/orderSlice/orderSlice';

// Моковые данные для нового заказа
const newOrderMock: TNewOrderResponse = {
  success: true,
  name: 'Флюоресцентный фалленианский люминесцентный бургер',
  order: {
    _id: '677d6616133acd001be48dca',
    number: 64954,
    name: 'Флюоресцентный фалленианский люминесцентный бургер',
    status: 'done',
    createdAt: '2025-01-07T17:36:22.236Z',
    updatedAt: '2025-01-07T17:36:23.307Z',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0947'
    ]
  }
};

// Моковые данные для заказа по номеру
const orderByNumberMock: TOrderResponse = {
  success: true,
  orders: [
    {
      _id: '677d6616133acd001be48dca',
      number: 64954,
      name: 'Флюоресцентный фалленианский люминесцентный бургер',
      status: 'done',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
      createdAt: '2025-01-07T17:36:22.236Z',
      updatedAt: '2025-01-07T17:36:23.307Z'
    }
  ]
};

describe('orderSlice', () => {
  // Проверка начального состояния
  it('должен вернуть начальное состояние', () => {
    const state = orderSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  // Проверка createOrderBurgerThunk.pending
  it('должен установить isLoading в true при createOrderBurgerThunk.pending', () => {
    const action = { type: createOrderBurgerThunk.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  // Проверка createOrderBurgerThunk.rejected
  it('должен установить isLoading в false при createOrderBurgerThunk.rejected', () => {
    const action = { type: createOrderBurgerThunk.rejected.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  // Проверка createOrderBurgerThunk.fulfilled
  it('должен загрузить новый заказ и установить isLoading в false при createOrderBurgerThunk.fulfilled', () => {
    const action = {
      type: createOrderBurgerThunk.fulfilled.type,
      payload: newOrderMock
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(newOrderMock.order);
  });

  // Проверка getOrderByNumberThunk.pending
  it('должен установить isLoading в true при getOrderByNumberThunk.pending', () => {
    const action = { type: getOrderByNumberThunk.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  // Проверка getOrderByNumberThunk.rejected
  it('должен установить isLoading в false при getOrderByNumberThunk.rejected', () => {
    const action = { type: getOrderByNumberThunk.rejected.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  // Проверка getOrderByNumberThunk.fulfilled
  it('должен загрузить заказ по номеру и установить isLoading в false при getOrderByNumberThunk.fulfilled', () => {
    const action = {
      type: getOrderByNumberThunk.fulfilled.type,
      payload: orderByNumberMock
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(orderByNumberMock.orders[0]);
  });

  // Проверка действия resetOrder
  it('должен сбросить информацию о заказе при вызове resetOrder', () => {
    const initialStateWithOrder = {
      ...initialState,
      order: newOrderMock.order
    };
    const state = orderSlice.reducer(initialStateWithOrder, resetOrder());
    expect(state.order).toBeNull();
  });

  // Проверка селектора selectOrder
  it('должен корректно выбирать заказ с помощью selectOrder', () => {
    const state = { order: { ...initialState, order: newOrderMock.order } };
    expect(selectOrder(state)).toEqual(newOrderMock.order);
  });

  // Проверка селектора selectLoadOrder
  it('должен корректно возвращать состояние загрузки с помощью selectLoadOrder', () => {
    const state = { order: { ...initialState, isLoading: true } };
    expect(selectLoadOrder(state)).toBe(true);
  });
});
