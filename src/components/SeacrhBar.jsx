import React, { useState } from "react";

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()){
       onSearch(query)
    };
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-gray-800 rounded-full px-4 py-2 mb-6 mt-[2px]  max-w-xl mx-auto"
    >
      <input
        type="text"
        placeholder="Search for movies..."
        className="bg-transparent flex-1 text-white placeholder-gray-400 focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-[#01b4e4] hover:bg-[#0287ab] px-4 py-2 rounded-full font-semibold transition"
      >
        Search
      </button>
    </form>
  );
};

 
