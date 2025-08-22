// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      <h1 className="text-6xl font-extrabold text-[#01b4e4] mb-4">404</h1>
      <p className="text-gray-300 text-lg mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="bg-[#01b4e4] px-6 py-3 rounded-md text-white font-semibold hover:bg-[#0287ab] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
