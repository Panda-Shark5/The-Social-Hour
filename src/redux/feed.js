import { createSlice } from "@reduxjs/toolkit";

export const feed = createSlice({
  name: "Like",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});


export const {increment, decrement} = feed.actions
export default feed.reducer;