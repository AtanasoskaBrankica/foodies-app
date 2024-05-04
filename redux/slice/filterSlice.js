import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  filteredMeals: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_BY_USER(state, action) {
      const {meals, userEmail} = action.payload;
      const tempMeals = meals.filter(meal => meal.email === userEmail);
      state.filteredMeals = tempMeals;
    },
  },
});

export const {FILTER_BY_USER} = filterSlice.actions;
export const selectFilteredMeals = state => state.filter.filteredMeals;
export default filterSlice.reducer;
