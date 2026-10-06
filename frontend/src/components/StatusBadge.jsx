import React from 'react';

// StatusBadge component renders a stylized badge for availability and request statuses
function StatusBadge({ status }) {
  let badgeClass = 'badge';

  switch (status) {
    case 'Available':
      badgeClass += ' badge-available';
      break;
    case 'Borrowed':
      badgeClass += ' badge-borrowed';
      break;
    case 'Pending':
      badgeClass += ' badge-pending';
      break;
    case 'Approved':
      badgeClass += ' badge-approved';
      break;
    case 'Rejected':
      badgeClass += ' badge-rejected';
      break;
    case 'Returned':
      badgeClass += ' badge-returned';
      break;
    default:
      badgeClass += ' badge-category';
  }

  return <span className={badgeClass}>{status}</span>;
}

export default StatusBadge;
