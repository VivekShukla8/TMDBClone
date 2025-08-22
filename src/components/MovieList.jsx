/* src/components/MovieList.jsx */
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-400">No movies available.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
