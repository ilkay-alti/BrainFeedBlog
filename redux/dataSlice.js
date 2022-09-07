import { createSlice } from "@reduxjs/toolkit";

//first start with an empty object
const initialState = {
  filter: "All",
  url: null,
};
//create the slice

const dataSlice = createSlice({
  name: "data",
  initialState,

  reducers: {
    changeFilterState: (state, action) => {
      state.filter = action.payload;
    },
    changeUrlState: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const { changeFilterState, changeUrlState } = dataSlice.actions;

export default dataSlice.reducer;
