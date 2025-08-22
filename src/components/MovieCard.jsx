/* src/components/MovieCard.jsx */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchList, removeFromWatchList } from "../redux/watchlistslice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.list);
  const isInWatchlist = watchlist.some((m) => m.id === movie?.id);

  if (!movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const toggleWatchlist = (e) => {
    e.preventDefault(); // prevent navigation
    if (isInWatchlist) {
      dispatch(removeFromWatchList(movie.id));
      toast.success("Removed from Watchlist");
    } else {
      dispatch(addToWatchList(movie));
      toast.success("Added to Watchlist");
    }
  };

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="relative group rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
        {/* Poster */}
        <img
          src={imageUrl}
          alt={movie.title || "Movie"}
          className="w-full h-80 object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-white text-lg font-bold truncate">
              {movie.title}
            </h3>
            <button
              onClick={toggleWatchlist}
              className="text-red-500 text-xl ml-2"
            >
              {isInWatchlist ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <p className="text-gray-300 text-sm mt-1">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
