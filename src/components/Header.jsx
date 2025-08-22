// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchGenres } from "../api/movieAPI";

export const Header = () => {
  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);

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


 

  return (
    <header className="bg-gray-950 text-white shadow-md sticky top-0 z-50 p-4">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#01b4e4]">
          🎬 MovieHub
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" onClick={() => setSearchResults([])} 
          className="hover:text-[#01b4e4]">Home</Link>
          <Link to="/top-rated" className="hover:text-[#01b4e4]">Top Rated</Link>
          <Link to="/upcoming" className="hover:text-[#01b4e4]">Upcoming</Link>
          <Link to="/watchlist" className="hover:text-[#01b4e4]">Watchlist</Link>

          {/* Genres Dropdown (Click Toggle) */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="hover:text-[#01b4e4] transition flex items-center gap-1"
            >
              Genres ▾
            </button>
            {open && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-gray-800 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
                {genres.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genre/${genre.id}`}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => setOpen(false)} // close after click
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

         
      </div>
    </header>
  );
};
