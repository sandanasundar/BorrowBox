import React from 'react';

const CATEGORIES = ['All', 'Study', 'Books', 'Electronics', 'Accessories', 'Sports', 'Other'];

function FilterBar({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter-pills">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
