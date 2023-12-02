import { createSlice } from '@reduxjs/toolkit';
import { IFormData } from '../types';

const initialState: {previousData: IFormData | undefined; currentData: IFormData | undefined} = {
  previousData: undefined,
  currentData: undefined,
}

const dataFormSlice = createSlice({
  name: 'dataFrom',
  initialState,
  reducers: {
    addData(state, action) {
      state.previousData = state.currentData;
      state.currentData = action.payload;
    },
    updateData(state) {
      state.previousData = state.currentData;
    }
  },
});

export const { addData, updateData } = dataFormSlice.actions;

export const dataFormReducer = dataFormSlice.reducer;