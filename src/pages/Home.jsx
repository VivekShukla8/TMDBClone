// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import {
  Header,
  Footer,
  SearchBar,
  MovieCardSkeleton,
} from "../components/index";
import MovieCard from "../components/MovieCard";
import {
  fetchPopularMovies,
  fetchGenres,
  fetchMoviesByGenre,
  searchMovies,
} from "../api/movieAPI";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load genres once
  useEffect(() => {
    (async () => {
      try {
        const g = await fetchGenres();
        setGenres(g || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // Fetch movies when filter/search/page changes
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        let data;

        if (query.trim()) {
          data = await searchMovies(query.trim(), page);
        } else if (selectedGenreId) {
          data = await fetchMoviesByGenre(selectedGenreId, page);
        } else {
          data = await fetchPopularMovies(page);
        }

        setMovies(data?.results || []);

        // 🔹 Limit total pages to max 50
        setTotalPages(Math.min(data?.total_pages || 1, 50));
      } catch (e) {
        console.error("Error loading movies:", e);
        setErr("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [query, selectedGenreId, page]);

  const handleSearch = (q) => {
    setQuery(q);
    setPage(1); // reset to first page on search
  };

  const handleGenreSelect = (genreId) => {
    setQuery(""); // clear search when selecting a genre
    setSelectedGenreId(genreId);
    setPage(1); // reset to first page
  };

  const activeLabel = query
    ? `Search: “${query}”`
    : selectedGenreId
    ? genres.find((g) => g.id === selectedGenreId)?.name || "Category"
    : "Popular";

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 text-white">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />
         

        {/* Content */}
        {err && (
          <div className="mb-4 rounded-lg bg-red-600/20 text-red-200 px-4 py-3">
            {err}
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : movies.length === 0 ? (
          <p className="text-gray-400">No movies found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-wrap justify-center items-center gap-3 mt-6 p-4 mb-[-40px] rounded-lg shadow-lg">
          {/* First Page */}
          <button
            disabled={page === 1}
            onClick={() => setPage(1)}
            className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 rounded-lg text-white font-semibold disabled:opacity-50 transition-all"
          >
            « First
          </button>

          {/* Previous Page */}
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 rounded-lg text-white font-semibold disabled:opacity-50 transition-all"
          >
            ‹ Prev
          </button>

          {/* Current Page */}
          <span className="px-4 py-2 bg-gray-700 rounded-lg text-white font-semibold">
            Page {page} of {totalPages}
          </span>

          {/* Next Page */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-2 bg-gradient-to-r from-green-400 to-lime-500 hover:from-lime-500 hover:to-green-400 rounded-lg text-white font-semibold disabled:opacity-50 transition-all"
          >
            Next ›
          </button>

          {/* Last Page */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(totalPages)}
            className="px-3 py-2 bg-gradient-to-r from-orange-400 to-red-500 hover:from-red-500 hover:to-orange-400 rounded-lg text-white font-semibold disabled:opacity-50 transition-all"
          >
            Last »
          </button>

          {/* Jump to Page */}
          <div className="flex items-center gap-2 ml-4">
            <input
              type="number"
              min={1}
              max={totalPages}
              placeholder="Page #"
              className="w-20 px-3 py-2 rounded-lg focus:outline-none text-white font-medium"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  let val = Math.min(Math.max(1, Number(e.target.value)), totalPages);
                  setPage(val);
                  e.target.value = "";
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = e.target.previousSibling;
                let val = Math.min(Math.max(1, Number(input.value)), totalPages);
                setPage(val);
                input.value = "";
              }}
              className="px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 rounded-lg text-white font-semibold transition-all"
            >
              Go
            </button>
          </div>
        </div>


      </main>

      <Footer />
    </div>
  );
};

export default Home;
