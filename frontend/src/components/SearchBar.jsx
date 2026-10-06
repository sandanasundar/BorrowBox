import React from 'react';

function SearchBar({ searchQuery, onSearchChange, onSearchSubmit }) {
  return (
    <form className="search-input-wrap" onSubmit={onSearchSubmit}>
      <input
        type="text"
        className="form-input"
        placeholder="🔍 Search items by name (e.g., calculator, book)..."
        value={searchQuery}
        onChange={onSearchChange}
      />
    </form>
  );
}

export default SearchBar;
