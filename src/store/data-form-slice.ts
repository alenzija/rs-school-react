import { createSlice } from '@reduxjs/toolkit';
import { IFormData } from '../types';

const initialState: {previousData: IFormData | undefined; currentData: IFormData | undefined} = {
  previousData: undefined,
  currentData: undefined,
}

const dataFormSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addData(state, action) {
      state.previousData = state.currentData;
      state.currentData = action.payload;
    },
  },
});

export const { addData } = dataFormSlice.actions;

export const dataFormReducer = dataFormSlice.reducer;