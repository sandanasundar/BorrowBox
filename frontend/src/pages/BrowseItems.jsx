import React, { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

function BrowseItems() {
  // React state hooks
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch items from Express REST API
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = 'http://localhost:5000/api/items?';
      if (selectedCategory && selectedCategory !== 'All') {
        url += `category=${encodeURIComponent(selectedCategory)}&`;
      }
      if (searchQuery.trim()) {
        url += `search=${encodeURIComponent(searchQuery.trim())}&`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch items from server');
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message || 'Unable to load items.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect triggers when selectedCategory changes or on initial mount
  useEffect(() => {
    fetchItems();
  }, [selectedCategory]);

  // Handle live search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchItems();
  };

  return (
    <div className="browse-page">
      <div className="page-header">
        <h2 className="page-title">Browse Available Items</h2>
        <p className="page-subtitle">Find calculators, lab coats, books, and electronics shared by fellow students.</p>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="filter-container">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />
      </div>

      {/* Conditional Rendering: Loading State */}
      {loading && <div className="loading-text">Loading items...</div>}

      {/* Conditional Rendering: Error State */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Conditional Rendering: Empty State */}
      {!loading && !error && items.length === 0 && (
        <div className="empty-state">
          <h3>No items found</h3>
          <p>Try adjusting your search query or selecting a different category filter.</p>
        </div>
      )}

      {/* Item Card Grid with map() and key props */}
      {!loading && !error && items.length > 0 && (
        <div className="item-grid">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseItems;
