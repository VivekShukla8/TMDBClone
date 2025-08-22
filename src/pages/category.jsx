// src/pages/Category.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { fetchMoviesByGenre, fetchGenres } from "../api/movieAPI";

const Category = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const genreList = await fetchGenres();
        setGenres(genreList);

        const genre = genreList.find((g) => g.name.toLowerCase() === category.toLowerCase());
        if (genre) {
          const data = await fetchMoviesByGenre(genre.id);
          setMovies(data.results);
        }
      } catch (err) {
        console.error("Error fetching category movies:", err);
      }
    };
    loadMovies();
  }, [category]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{category} Movies</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            rating={movie.vote_average}
            genre={movie.genre_ids?.[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
