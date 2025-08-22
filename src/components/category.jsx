import React from "react";

const categories = ["All", "Action", "Comedy", "Drama", "Horror", "Romance"];

export const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition
            ${
              selectedCategory === category
                ? "bg-[#01b4e4] text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};


