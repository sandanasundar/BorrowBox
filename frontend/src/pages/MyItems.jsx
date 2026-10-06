import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import ItemForm from '../components/ItemForm';

function MyItems() {
  const [studentName, setStudentName] = useState('Sandana');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch items belonging to studentName
  const fetchMyItems = async () => {
    if (!studentName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/items?ownerName=${encodeURIComponent(studentName.trim())}`);
      if (!response.ok) throw new Error('Failed to fetch user items');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message || 'Error loading items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, [studentName]);

  // Delete item handler
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete item');
      
      setMessage('Item deleted successfully.');
      fetchMyItems();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete item');
    }
  };

  // Start editing item
  const handleEditClick = (item) => {
    setEditingItem({ ...item });
  };

  // Edit form input change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingItem((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit PUT /api/items/:id
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/items/${editingItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingItem)
      });

      if (!response.ok) throw new Error('Failed to update item');

      setMessage('Item updated successfully!');
      setEditingItem(null);
      fetchMyItems();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update item');
    }
  };

  return (
    <div className="my-items-page">
      <div className="page-header">
        <h2 className="page-title">My Listed Items</h2>
        <p className="page-subtitle">Manage items you have offered to lend, edit details, or delete listings.</p>
      </div>

      {/* Student Selector Input */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.2rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Filter by Student / Lender Name:</label>
          <input
            type="text"
            className="form-input"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Type your name to see your listed items (e.g., Sandana, Rahul)"
          />
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Edit Form Modal/Section */}
      {editingItem && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>✏️ Edit Item: {editingItem.itemName}</h3>
            <button onClick={() => setEditingItem(null)} className="btn btn-secondary btn-sm">
              Cancel Edit
            </button>
          </div>
          <ItemForm
            formData={editingItem}
            onChange={handleEditChange}
            onSubmit={handleEditSubmit}
            isEditing={true}
            buttonText="💾 Update Item Details"
          />
        </div>
      )}

      {loading && <div className="loading-text">Loading your listed items...</div>}

      {!loading && items.length === 0 && (
        <div className="empty-state">
          <h3>No items listed under "{studentName}"</h3>
          <p>No items were found matching this lender name.</p>
          <Link to="/add-item" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            ➕ List a New Item
          </Link>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="item-grid">
          {items.map((item) => (
            <div key={item._id} className="card">
              <div className="item-card-title">
                <span>{item.itemName}</span>
                <StatusBadge status={item.availability} />
              </div>

              <div className="item-card-meta">
                <span className="badge badge-category">{item.category}</span> • 
                <span> Condition: <strong>{item.condition}</strong></span>
              </div>

              <p className="item-card-desc">{item.description}</p>

              <div className="item-card-footer" style={{ gap: '0.5rem' }}>
                <Link to={`/items/${item._id}`} className="btn btn-secondary btn-sm">
                  View
                </Link>
                <button
                  onClick={() => handleEditClick(item)}
                  className="btn btn-primary btn-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id, item.itemName)}
                  className="btn btn-danger btn-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyItems;
