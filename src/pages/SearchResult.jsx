import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../api/movieAPI";

const SearchResults = () => {
  const { query } = useParams();   // ✅ get from URL param
  const [results, setResults] = useState([]);

  useEffect(() => {
    const loadResults = async () => {
      if (!query) return;
      try {
        const data = await searchMovies(query);
        setResults(data.results || []);
      } catch (err) {
        console.error("Error searching movies:", err);
      }
    };
    loadResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h1 className="text-3xl font-bold text-[#01b4e4] mb-6">
        Search Results for: <span className="text-white">{query}</span>
      </h1>

      {results.length > 0 ? (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              rating={movie.vote_average}
              genre={movie.genre_ids?.[0]}
            />
          ))}
          
        </div>
      ) : (
        <p className="text-gray-400 text-lg">No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResults;
