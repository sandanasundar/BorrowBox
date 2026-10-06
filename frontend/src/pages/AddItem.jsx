import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from '../components/ItemForm';

function AddItem() {
  const navigate = useNavigate();

  // Controlled form state
  const [formData, setFormData] = useState({
    itemName: '',
    category: 'Study',
    description: '',
    ownerName: '',
    ownerDepartment: 'CSE',
    ownerYear: 'III',
    condition: 'Good'
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Form submit handler using Fetch API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to list item');
      }

      // Show success state & reset form
      setMessage('Item listed successfully!');
      setFormData({
        itemName: '',
        category: 'Study',
        description: '',
        ownerName: '',
        ownerDepartment: 'CSE',
        ownerYear: 'III',
        condition: 'Good'
      });

      // Redirect to browse items after 1.5 seconds
      setTimeout(() => {
        navigate('/items');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Something went wrong while submitting.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-item-page" style={{ maxWidth: '650px', margin: '0 auto' }}>
      <div className="page-header">
        <h2 className="page-title">List an Item to Lend</h2>
        <p className="page-subtitle">Share your study materials, chargers, or lab equipment with fellow students.</p>
      </div>

      {message && <div className="alert alert-success">{message} Redirecting to Browse Items...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <ItemForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonText={submitting ? 'Posting Item...' : '➕ Post Item for Lending'}
      />
    </div>
  );
}

export default AddItem;
