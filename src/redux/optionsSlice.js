import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'searchOptions',
  initialState: {
    options: {
      category: 'all',
      sortType: 'relevance'
    }
  },
  reducers: {
    setCategory: (state, action) => {
      state.options.category = action.payload;
    },
    setSortType: (state, action) => {
      state.options.sortType = action.payload;
    },
  },
});

export const { setCategory, setSortType } = slice.actions;

export const selectOptions = state => state.searchOptions.options;

export default slice.reducer;
