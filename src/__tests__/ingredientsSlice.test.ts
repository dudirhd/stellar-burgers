import {
  ingredientsSlice,
  initialState,
  getIngredientsThunk,
  selectIngredients,
  selectLoadIngredients
} from '../services/slices/ingredientsSlice/ingredientsSlice';
import { TIngredient } from '@utils-types';

// Моковые данные для ингредиентов
const ingredientsMock: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png'
  }
];

describe('ingredientsSlice', () => {
  // Проверка начального состояния
  it('должен вернуть начальное состояние', () => {
    const state = ingredientsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  // Проверка состояния pending
  it('должен установить isLoading в true при getIngredientsThunk.pending', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  // Проверка состояния rejected
  it('должен установить isLoading в false при getIngredientsThunk.rejected', () => {
    const action = { type: getIngredientsThunk.rejected.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  // Проверка состояния fulfilled
  it('должен загрузить ингредиенты и установить isLoading в false при getIngredientsThunk.fulfilled', () => {
    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: ingredientsMock
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredientsMock);
  });

  // Проверка селектора selectIngredients
  it('должен корректно выбирать ингредиенты с помощью selectIngredients', () => {
    const state = {
      ingredients: { ...initialState, ingredients: ingredientsMock }
    };
    expect(selectIngredients(state)).toEqual(ingredientsMock);
  });

  // Проверка селектора selectLoadIngredients
  it('должен корректно возвращать состояние загрузки с помощью selectLoadIngredients', () => {
    const state = { ingredients: { ...initialState, isLoading: true } };
    expect(selectLoadIngredients(state)).toBe(true);
  });
});
