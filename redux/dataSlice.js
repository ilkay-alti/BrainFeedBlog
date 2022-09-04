import { createSlice } from "@reduxjs/toolkit";

//first start with an empty object
const initialState = {
  filter: "All",
};
//create the slice

const dataSlice = createSlice({
  name: "data",
  initialState,

  reducers: {
    changeFilterState: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { changeFilterState } = dataSlice.actions;

export default dataSlice.reducer;
