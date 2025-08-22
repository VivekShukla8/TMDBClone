const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";

export const TMDB = {
  BASE_URL,
  API_KEY,
  IMAGE_BASE: "https://image.tmdb.org/t/p/w500",
  ENDPOINTS: {
    POPULAR: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
    TOP_RATED: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
    UPCOMING: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
    SEARCH: (query) => `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
    MOVIE_DETAILS: (id) => `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
  }
};
