import { configureStore } from '@reduxjs/toolkit'
import libReducer from '../redux/libSlice'
import optionsSlice from '../redux/optionsSlice'
import querySlice from '../redux/querySlice'
import curBookSlice from '../redux/curBookSlice'

export const store = configureStore({
  reducer: {
    lib: libReducer,
    searchOptions: optionsSlice,
    query: querySlice,
    curBook: curBookSlice,
  }
})