import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { IIngredientsState } from './ingredientsSlice.typings';

export const getIngredientsThunk = createAsyncThunk<TIngredient[]>(
  `ingredients/getIngredients`,
  async () => getIngredientsApi()
);

export const initialState: IIngredientsState = {
  isLoading: false,
  ingredients: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (sliceState: IIngredientsState) =>
      sliceState.ingredients,
    selectLoadIngredients: (sliceState: IIngredientsState) =>
      sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredientsThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        getIngredientsThunk.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload;
        }
      );
  }
});

export const { selectIngredients, selectLoadIngredients } =
  ingredientsSlice.selectors;
