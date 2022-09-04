import { configureStore } from "@reduxjs/toolkit";
import data from "./dataSlice";
//create store
export const store = configureStore({
  reducer: {
    data,
  },
});
