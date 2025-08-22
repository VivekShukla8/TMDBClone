import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/movieAPI";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const m = await fetchMovieDetails(id);
      setMovie(m);

      // fetch trailers/watch providers
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
      );
      setVideos(res.data.results);
    };
    loadData();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const trailer = videos.find(v => v.type === "Trailer" && v.site === "YouTube");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg shadow mb-4"
      />
      <p className="mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
      <p className="mb-2"><strong>Rating:</strong> {movie.vote_average}/10</p>
      <p className="mb-4">{movie.overview}</p>

      {trailer && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Trailer</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
