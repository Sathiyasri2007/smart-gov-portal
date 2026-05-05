import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchFilter = ({ search, setSearch, category, setCategory, categories }) => {
  return (
    <div className="card mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search schemes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
