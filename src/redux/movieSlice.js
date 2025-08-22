import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TMDB } from "../configue/conf";

const API_KEY = TMDB.API_KEY;
const BASE_URL = TMDB.BASE_URL;

// Thunks for async API calls
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (category = "popular") => {
    const response = await axios.get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
    return response.data.results; 
  }
);

export const fetchGenres = createAsyncThunk(
  "movies/fetchGenres",
  async () => {
    const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return response.data.genres;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    genres: [],
    selectedGenre: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch genres
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

export const { setSelectedGenre } = movieSlice.actions;
export default movieSlice.reducer;
