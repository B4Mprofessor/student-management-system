import React from "react";

const SearchBar = ({ setSearchTerm }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search by name"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
  );
};

export default SearchBar;
