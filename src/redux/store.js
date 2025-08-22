import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import watchListReducer from "./watchlistslice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    watchlist: watchListReducer,
  },
});

export default store;
