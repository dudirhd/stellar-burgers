import {
  burgerConstructorSlice,
  initialState,
  addIngredient,
  removeIngredient,
  upIngredient,
  downIngredient,
  resetConstructor
} from '../services/slices/constructorSlice/constructorSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

// Изначальные данные для тестов
const bun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  price: 988
};

const ingredient1: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  price: 988
};

describe('burgerConstructorSlice', () => {
  it('должен вернуть начальное состояние', () => {
    const state = burgerConstructorSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('должен добавить булку в конструктор', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );
    expect(state.bun).toMatchObject({
      ...bun,
      id: expect.any(String) // Проверяем, что поле id присутствует и является строкой
    });
  });

  it('должен добавить ингредиент в массив ingredients', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient1)
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({
      ...ingredient1,
      id: expect.any(String) // Проверяем, что поле id присутствует и является строкой
    });
  });

  it('должен удалить ингредиент из массива ingredients', () => {
    const initial = {
      ...initialState,
      ingredients: [{ ...ingredient1, id: 'mocked-id' }]
    };

    const state = burgerConstructorSlice.reducer(
      initial,
      removeIngredient({ ...ingredient1, id: 'mocked-id' })
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен переместить ингредиент вверх по списку', () => {
    const initial = {
      ...initialState,
      ingredients: [
        { ...ingredient1, id: 'id-1' },
        { ...bun, id: 'id-2' }
      ]
    };

    const state = burgerConstructorSlice.reducer(initial, upIngredient(1));
    expect(state.ingredients[0].id).toBe('id-2');
    expect(state.ingredients[1].id).toBe('id-1');
  });

  it('должен переместить ингредиент вниз по списку', () => {
    const initial = {
      ...initialState,
      ingredients: [
        { ...bun, id: 'id-2' },
        { ...ingredient1, id: 'id-1' }
      ]
    };

    const state = burgerConstructorSlice.reducer(initial, downIngredient(0));
    expect(state.ingredients[0].id).toBe('id-1');
    expect(state.ingredients[1].id).toBe('id-2');
  });

  it('должен сбросить состояние до начального', () => {
    const modifiedState = {
      bun: { ...bun, id: 'mocked-id' },
      ingredients: [{ ...ingredient1, id: 'mocked-id' }]
    };

    const state = burgerConstructorSlice.reducer(
      modifiedState,
      resetConstructor()
    );
    expect(state).toEqual(initialState);
  });
});
