import { TConstructorIngredient } from '@utils-types';

export interface IBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}
