import React from "react";

const FilterDropdown = ({ setFilterStatus }) => {
  return (
    <div className="w-full max-w-xs">
      <select
        onChange={(e) => setFilterStatus(e.target.value)}
        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 custom-dropdown"
      >
        <option value="all">All Students</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
