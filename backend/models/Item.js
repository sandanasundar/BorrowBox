const mongoose = require('mongoose');

// Define schema for Item model
const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Study', 'Books', 'Electronics', 'Accessories', 'Sports', 'Other'],
    default: 'Other'
  },
  description: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true,
    trim: true
  },
  ownerDepartment: {
    type: String,
    required: true
  },
  ownerYear: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    enum: ['Available', 'Borrowed'],
    default: 'Available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);
