// src/pages/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold text-[#01b4e4] mb-6">About Us</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Welcome to <span className="text-white font-semibold">TMDB Clone</span> 🎬  
          Built with <span className="text-[#01b4e4]">React</span> and <span className="text-[#01b4e4]">TailwindCSS</span>.  
          You can explore categories, search for your favorite movies, and view detailed
          information about films fetched directly from{" "}
          <span className="text-[#01b4e4]">The Movie Database (TMDB)</span>.
        </p>
      </div>
    </div>
  );
};

export default About;
