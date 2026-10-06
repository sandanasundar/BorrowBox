import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

// ItemCard component receives item object as prop
function ItemCard({ item }) {
  return (
    <div className="card">
      <div className="item-card-title">
        <span>{item.itemName}</span>
        <StatusBadge status={item.availability} />
      </div>

      <div className="item-card-meta">
        <span className="badge badge-category">{item.category}</span> • 
        <span> Condition: <strong>{item.condition}</strong></span>
      </div>

      <p className="item-card-desc">{item.description}</p>

      <div className="item-card-meta">
        <strong>Lender:</strong> {item.ownerName} ({item.ownerDepartment}, Year {item.ownerYear})
      </div>

      <div className="item-card-footer">
        <Link to={`/items/${item._id}`} className="btn btn-secondary btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ItemCard;
