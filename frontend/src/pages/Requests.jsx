import React, { useState, useEffect } from 'react';
import RequestCard from '../components/RequestCard';

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch all borrow requests GET /api/requests
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/requests');
      if (!response.ok) throw new Error('Failed to load borrow requests');
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      setError(err.message || 'Unable to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Update request status PUT /api/requests/:id
  const handleUpdateStatus = async (id, newStatus) => {
    setMessage(null);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update request');

      setMessage(`Request successfully updated to "${newStatus}"!`);
      fetchRequests();
      setTimeout(() => setMessage(null), 3500);
    } catch (err) {
      setError(err.message || 'Error updating status');
    }
  };

  return (
    <div className="requests-page">
      <div className="page-header">
        <h2 className="page-title">Borrow Requests</h2>
        <p className="page-subtitle">Track and respond to borrow requests sent by fellow students.</p>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {loading && <div className="loading-text">Loading borrow requests...</div>}

      {!loading && requests.length === 0 && (
        <div className="empty-state">
          <h3>No borrow requests found</h3>
          <p>When students submit requests for available items, they will appear here.</p>
        </div>
      )}

      {!loading && requests.length > 0 && (
        <div className="item-grid">
          {requests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Requests;
