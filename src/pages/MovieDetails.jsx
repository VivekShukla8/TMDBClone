// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/movieAPI";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };
    loadDetails();
  }, [id]);

  if (!movie) return <p className="p-4">Loading...</p>;

  return (
    <div className="relative min-h-screen text-white">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-50"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col md:flex-row gap-10 items-start">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-2xl shadow-2xl"
        />

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {movie.title}
          </h1>

          <div className="flex items-center gap-6 mb-4 text-gray-300">
            <span className="flex items-center gap-1">
              ⭐ <span className="font-semibold">{movie.vote_average}</span>
            </span>
            <span>{movie.release_date?.split("-")[0]}</span>
            <span>{movie.runtime} min</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres?.map((g) => (
              <span
                key={g.id}
                className="bg-[#01b4e4]/20 text-[#01b4e4] px-3 py-1 rounded-full text-sm font-medium"
              >
                {g.name}
              </span>
            ))}
          </div>

          <p className="text-lg leading-relaxed text-gray-200 mb-8">
            {movie.overview}
          </p>

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#01b4e4] hover:bg-[#0297c6] rounded-full font-semibold shadow-lg transition"
            >
              🔗 Watch / Official Page
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
