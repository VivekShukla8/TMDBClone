// src/pages/GenrePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesByGenre, fetchGenres } from "../api/movieAPI";
import MovieCard from "../components/MovieCard";
import { Header, Footer } from "../components"; // ✅ Import Header & Footer

const GenrePage = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch genres list
  useEffect(() => {
    (async () => {
      try {
        const g = await fetchGenres();
        setGenres(g || []);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    })();
  }, []);

  // Fetch movies by genre
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMoviesByGenre(id, page);
        setMovies(data.results || []);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error fetching genre movies:", err);
      }
    })();
  }, [id, page]);

  // Update genre name
  useEffect(() => {
    const g = genres.find((genre) => genre.id.toString() === id);
    setGenreName(g ? g.name : "Genre");
  }, [id, genres]);

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      {/* ✅ Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-6 text-center text-[#01b4e4] uppercase tracking-wide">
            {genreName} Movies
          </h1>

          {/* Movies Grid */}
          {movies.length === 0 ? (
            <p className="text-center text-gray-400">No movies found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}

          {/* Pagination */}
           <div className="flex flex-wrap justify-center items-center gap-3 mt-6 p-4 bg-gray-800 rounded-lg shadow-lg">
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
        </div>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default GenrePage;
