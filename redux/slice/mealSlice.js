import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  meals: [],
};

const mealsSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    STORE_MEALS(state, action) {
      state.meals = action.payload.meals;
    },
  },
});

export const {STORE_MEALS} = mealsSlice.actions;
export const selectMeals = state => state.meal.meals;

export default mealsSlice.reducer;
