const mongoose = require('mongoose');

// Define schema for BorrowRequest model
const borrowRequestSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  borrowerName: {
    type: String,
    required: true,
    trim: true
  },
  borrowerDepartment: {
    type: String,
    required: true
  },
  borrowerYear: {
    type: String,
    required: true
  },
  requestMessage: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Returned'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BorrowRequest', borrowRequestSchema);
