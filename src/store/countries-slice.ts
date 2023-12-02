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
    filterCountries(state, action: {
      payload: string;
      type: string;
    }) {
      state.values = [...COUNTRIES.filter((item) => item.toLocaleLowerCase().includes(action.payload.trim().toLowerCase()))]
    }
  },
});

export const { addCountry, filterCountries } = countriesSlice.actions;

export const countriesReducer = countriesSlice.reducer;
