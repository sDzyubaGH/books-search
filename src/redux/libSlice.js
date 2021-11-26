import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'lib',
  initialState: {
    books: [],
    totalItems: 0,
  },
  reducers: {
    addBooks: (state, action) => {
      state.books = action.payload;
    },
    loadMoreBooks: (state, action) => {
      state.books = [...state.books].concat(action.payload)
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload
    }
  },
});

export const { addBooks, loadMoreBooks, setTotalItems } = slice.actions;

export const selectLib = state => state.lib.books;

export default slice.reducer;
