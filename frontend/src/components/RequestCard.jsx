import React from 'react';
import StatusBadge from './StatusBadge';

function RequestCard({ request, onUpdateStatus }) {
  return (
    <div className="card">
      <div className="item-card-title">
        <span>📦 {request.itemName}</span>
        <StatusBadge status={request.status} />
      </div>

      <div className="item-card-meta">
        <strong>Borrower:</strong> {request.borrowerName} ({request.borrowerDepartment}, Year {request.borrowerYear})
      </div>

      <p className="item-card-desc" style={{ fontStyle: 'italic', background: '#f8fafc', padding: '0.6rem', borderRadius: '6px' }}>
        "{request.requestMessage}"
      </p>

      <div className="item-card-meta" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
        Submitted on: {new Date(request.createdAt).toLocaleDateString()}
      </div>

      <div className="item-card-footer" style={{ gap: '0.5rem' }}>
        {request.status === 'Pending' && (
          <>
            <button
              onClick={() => onUpdateStatus(request._id, 'Approved')}
              className="btn btn-success btn-sm"
            >
              ✓ Approve Request
            </button>
            <button
              onClick={() => onUpdateStatus(request._id, 'Rejected')}
              className="btn btn-danger btn-sm"
            >
              ✕ Reject
            </button>
          </>
        )}

        {request.status === 'Approved' && (
          <button
            onClick={() => onUpdateStatus(request._id, 'Returned')}
            className="btn btn-secondary btn-sm"
          >
            🔄 Mark as Returned
          </button>
        )}
      </div>
    </div>
  );
}

export default RequestCard;
