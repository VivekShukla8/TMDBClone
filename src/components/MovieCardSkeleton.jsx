import React from "react";

export const MovieCardSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-2xl animate-pulse max-w-[220px] sm:max-w-[260px]">
      <div className="h-64 bg-gray-700"></div>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
        <div className="h-3 bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
  );
};

 
