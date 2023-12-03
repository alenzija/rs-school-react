import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../consts';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    values: COUNTRIES,
  },
  reducers: {},
});

export const countriesReducer = countriesSlice.reducer;
