import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../consts';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    values: COUNTRIES,
  },
  reducers: {
    addCountry(state, action) {
      state.values.push(action.payload);
      state.values.sort();
    },
  },
});

export const { addCountry } = countriesSlice.actions;

export const countriesReducer = countriesSlice.reducer;
