// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchGenres } from "../api/movieAPI";

export const Header = () => {
  const [genres, setGenres] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);

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
    <header className="bg-gray-950 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#01b4e4]">
          🎬 MovieHub
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-[#01b4e4]">Home</Link>
          <Link to="/top-rated" className="hover:text-[#01b4e4]">Top Rated</Link>
          <Link to="/upcoming" className="hover:text-[#01b4e4]">Upcoming</Link>
          <Link to="/watchlist" className="hover:text-[#01b4e4]">Watchlist</Link>

          {/* Genres Dropdown */}
          <div className="relative">
            <button
              onClick={() => setGenreOpen(!genreOpen)}
              className="hover:text-[#01b4e4] transition flex items-center gap-1"
            >
              Genres ▾
            </button>
            {genreOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-gray-800 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
                {genres.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genre/${genre.id}`}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => setGenreOpen(false)}
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            ☰
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
              <Link to="/" className="block px-4 py-2 text-gray-300 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/top-rated" className="block px-4 py-2 text-gray-300 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Top Rated</Link>
              <Link to="/upcoming" className="block px-4 py-2 text-gray-300 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Upcoming</Link>
              <Link to="/watchlist" className="block px-4 py-2 text-gray-300 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Watchlist</Link>

              {/* Mobile Genres Dropdown */}
              <div className="border-t border-gray-700">
                <button
                  onClick={() => setGenreOpen(!genreOpen)}
                  className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 flex justify-between items-center"
                >
                  Genres ▾
                </button>
                {genreOpen && (
                  <div className="bg-gray-700 max-h-60 overflow-y-auto">
                    {genres.map((genre) => (
                      <Link
                        key={genre.id}
                        to={`/genre/${genre.id}`}
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-600"
                        onClick={() => {
                          setMenuOpen(false);
                          setGenreOpen(false);
                        }}
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
