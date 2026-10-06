import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';

function ItemDetails() {
  const { id } = useParams();

  // State
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Borrow request form state
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestData, setRequestData] = useState({
    borrowerName: '',
    borrowerDepartment: 'CSE',
    borrowerYear: 'III',
    requestMessage: ''
  });
  const [requestMessageState, setRequestMessageState] = useState(null);
  const [requestErrorState, setRequestErrorState] = useState(null);
  const [requestSubmitting, setRequestSubmitting] = useState(false);

  // Fetch item details on mount or ID change
  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/items/${id}`);
        if (!response.ok) {
          throw new Error('Item not found or server error');
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message || 'Unable to load item details');
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  // Handle request form inputs
  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit borrow request POST /api/requests
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setRequestMessageState(null);
    setRequestErrorState(null);
    setRequestSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemId: item._id,
          itemName: item.itemName,
          ...requestData
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit borrow request');
      }

      setRequestMessageState('Borrow request submitted successfully.');
      setShowRequestForm(false);
      setRequestData({
        borrowerName: '',
        borrowerDepartment: 'CSE',
        borrowerYear: 'III',
        requestMessage: ''
      });
    } catch (err) {
      setRequestErrorState(err.message || 'Error submitting request');
    } finally {
      setRequestSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading-text">Loading item details...</div>;
  }

  if (error || !item) {
    return (
      <div className="alert alert-danger">
        {error || 'Item not found.'} <br />
        <Link to="/items" className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem' }}>
          Back to Items
        </Link>
      </div>
    );
  }

  return (
    <div className="item-details-page" style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span className="badge badge-category">{item.category}</span>
          <StatusBadge status={item.availability} />
        </div>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{item.itemName}</h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Condition: <strong>{item.condition}</strong>
        </p>

        <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Description</h4>
          <p style={{ color: '#334155', whiteSpace: 'pre-line' }}>{item.description}</p>
        </div>

        <div style={{ background: '#e0e7ff', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <h4 style={{ color: '#3730a3', marginBottom: '0.4rem' }}>Lender Information</h4>
          <p style={{ color: '#1e1b4b', fontSize: '0.95rem' }}>
            <strong>Owner:</strong> {item.ownerName} <br />
            <strong>Department:</strong> {item.ownerDepartment} <br />
            <strong>Year:</strong> {item.ownerYear} Year
          </p>
        </div>

        {/* Action button conditional rendering */}
        {item.availability === 'Available' ? (
          !showRequestForm && (
            <button
              onClick={() => setShowRequestForm(true)}
              className="btn btn-primary"
              style={{ width: '100%', fontSize: '1.05rem', padding: '0.75rem' }}
            >
              📥 Request to Borrow
            </button>
          )
        ) : (
          <div className="alert alert-info" style={{ textAlign: 'center', fontWeight: '600' }}>
            Currently Borrowed - Not available at the moment.
          </div>
        )}

        {requestMessageState && (
          <div className="alert alert-success" style={{ marginTop: '1rem' }}>
            {requestMessageState}
          </div>
        )}

        {requestErrorState && (
          <div className="alert alert-danger" style={{ marginTop: '1rem' }}>
            {requestErrorState}
          </div>
        )}

        {/* Borrow Request Form */}
        {showRequestForm && (
          <form onSubmit={handleRequestSubmit} style={{ marginTop: '1.5rem', borderTop: '2px solid #e2e8f0', paddingTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Send Borrow Request</h3>
            
            <div className="form-group">
              <label className="form-label">Your Full Name *</label>
              <input
                type="text"
                name="borrowerName"
                className="form-input"
                placeholder="e.g. Sandana"
                value={requestData.borrowerName}
                onChange={handleRequestChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Department *</label>
                <input
                  type="text"
                  name="borrowerDepartment"
                  className="form-input"
                  placeholder="e.g. CSE, ECE"
                  value={requestData.borrowerDepartment}
                  onChange={handleRequestChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Academic Year *</label>
                <select
                  name="borrowerYear"
                  className="form-select"
                  value={requestData.borrowerYear}
                  onChange={handleRequestChange}
                  required
                >
                  <option value="I">I Year</option>
                  <option value="II">II Year</option>
                  <option value="III">III Year</option>
                  <option value="IV">IV Year</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Request Message / Purpose *</label>
              <textarea
                name="requestMessage"
                rows="3"
                className="form-textarea"
                placeholder="Explain why you need this item and how long you plan to keep it..."
                value={requestData.requestMessage}
                onChange={handleRequestChange}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                {requestSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
              <button
                type="button"
                onClick={() => setShowRequestForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ItemDetails;
