import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'query',
  initialState: {
    query: {
      notFound: false,
      startIndex: 0,
      // bookName: '',
    }
  },
  reducers: {
    setNotFound: (state, action) => {
      state.query.notFound = action.payload
    },
    incStartIndex: (state, action) => {
      state.query.startIndex += action.payload;
    },
    setBookName: (state, action) => {
      state.query.bookName = action.payload;
    }
  },
});

export const { incStartIndex, setBookName, setNotFound } = slice.actions;

export const selectQuery = state => state.query;

export default slice.reducer;
