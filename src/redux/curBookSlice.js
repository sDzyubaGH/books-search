import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'curBook',
  initialState: {
    id: '',
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setId, setInfo } = slice.actions;

export const selectId = state => state.curBook.id;

export default slice.reducer;
