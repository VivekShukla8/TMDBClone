import axios from "axios";
import { TMDB } from "../configue/conf";

const TMDB_API_KEY = TMDB.API_KEY;
const TMDB_BASE_URL = TMDB.BASE_URL;

// Create axios instance for TMDB
const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "en-US",
  },
});

// Fetch popular movies
export const fetchPopularMovies = async (page = 1) => {
  const res = await api.get("/movie/popular", {
    params: { page },
  });
  return res.data;
};

// Fetch movies by genre
export const fetchMoviesByGenre = async (genreId, page = 1) => {
  const res = await api.get("/discover/movie", {
    params: { with_genres: genreId, page },
  });
  return res.data;
};

// Fetch all genres
export const fetchGenres = async () => {
  const res = await api.get("/genre/movie/list");
  return res.data.genres;
};

// Fetch movie details
export const fetchMovieDetails = async (movieId) => {
  const res = await api.get(`/movie/${movieId}`);
  return res.data;
};

// Search movies
export const searchMovies = async (query, page = 1) => {
  const res = await api.get("/search/movie", {
    params: { query, page },
  });
  return res.data;
};

// Fetch Top Rated
export const fetchTopRatedMovies = async (page = 1) => {
  const res = await api.get("/movie/top_rated", {
    params: { page },
  });
  return res.data;
};

//  Fetch Upcoming
export const fetchUpcomingMovies = async (page = 1) => {
  const res = await api.get("/movie/upcoming", {
    params: { page },
  });
  return res.data;
};
