import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: localStorage.getItem('searchPhrase') || '',
  },
  reducers: {
    changeSearch(state, action) {
      console.log('change search', state, action);
      state.value = action.payload;
    },
  },
});

export const { changeSearch } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
