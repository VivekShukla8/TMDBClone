import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { Header, Footer } from "../components/index";

const Watchlist = () => {
  const watchlist = useSelector((state) => state.watchlist.list);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 text-white">
        <h2 className="text-2xl font-bold mb-5">My Watchlist</h2>

        {watchlist.length === 0 ? (
          <p className="text-gray-400">Your watchlist is empty.</p>
        ) : (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Watchlist;
