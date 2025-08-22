// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-10">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        
        {/* Brand/About */}
        <div>
          <h2 className="text-xl font-bold text-white">🎬 MovieHub</h2>
          <p className="mt-2 text-sm">
            Discover trending, top-rated, and upcoming movies.  
            Powered by TMDB API.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-[#01b4e4]">Home</Link></li>
            <li><Link to="/top-rated" className="hover:text-[#01b4e4]">Top Rated</Link></li>
            <li><Link to="/upcoming" className="hover:text-[#01b4e4]">Upcoming</Link></li>
            <li><Link to="/watchlist" className="hover:text-[#01b4e4]">Watchlist</Link></li>
          </ul>
        </div>

        {/* Contact and About */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-[#01b4e4]">About</Link></li>
            <li><Link to="/contact" className="hover:text-[#01b4e4]">Contact</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="font-semibold text-white mb-3">Connect</h3>
          <div className="flex gap-4">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-[#01b4e4]">
              <Github />
            </a>
            <a href="https://www.linkedin.com/in/vivek-shukla-40b05a258/" target="_blank" rel="noreferrer" className="hover:text-[#01b4e4]">
              <Linkedin />
            </a>
            <a href="https://x.com/vivek_shuk24661" target="_blank" rel="noreferrer" className="hover:text-[#01b4e4]">
              <Twitter />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center border-t border-gray-700 py-4 text-sm">
        © {new Date().getFullYear()} MovieHub. Powered by TMDB.
      </div>
    </footer>
  );
};
