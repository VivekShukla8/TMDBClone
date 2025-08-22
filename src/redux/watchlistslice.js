import { createSlice } from "@reduxjs/toolkit";

const watchListSlice = createSlice({
  name: "watchlist",
  initialState: {
    list: [],
  },
  reducers: {
    addToWatchList: (state, action) => {
      state.list.push(action.payload);
    },
    removeFromWatchList: (state, action) => {
      state.list = state.list.filter((movie) => movie.id !== action.payload);
    },
  },
  
});

export const { addToWatchList, removeFromWatchList } = watchListSlice.actions;
export default watchListSlice.reducer;
