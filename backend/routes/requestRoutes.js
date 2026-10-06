const express = require('express');
const router = express.Router();
const BorrowRequest = require('../models/BorrowRequest');
const Item = require('../models/Item');

// GET /api/requests - Get all borrow requests
router.get('/', async (req, res) => {
  try {
    const requests = await BorrowRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch borrow requests', error: error.message });
  }
});

// POST /api/requests - Create a new borrow request
router.post('/', async (req, res) => {
  try {
    const { itemId, itemName, borrowerName, borrowerDepartment, borrowerYear, requestMessage } = req.body;

    if (!itemId || !itemName || !borrowerName || !borrowerDepartment || !borrowerYear || !requestMessage) {
      return res.status(400).json({ message: 'All request fields are required' });
    }

    // Verify item exists and is available
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Target item not found' });
    }

    const newRequest = new BorrowRequest({
      itemId,
      itemName,
      borrowerName,
      borrowerDepartment,
      borrowerYear,
      requestMessage,
      status: 'Pending'
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({ message: 'Borrow request submitted successfully', request: savedRequest });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create borrow request', error: error.message });
  }
});

// PUT /api/requests/:id - Update borrow request status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Approved', 'Rejected', 'Returned'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const request = await BorrowRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Borrow request not found' });
    }

    request.status = status;
    const updatedRequest = await request.save();

    // Synchronization logic with Item availability:
    // If Approved -> update corresponding item availability to 'Borrowed'
    // If Returned -> update corresponding item availability to 'Available'
    if (status === 'Approved') {
      await Item.findByIdAndUpdate(request.itemId, { availability: 'Borrowed' });
    } else if (status === 'Returned') {
      await Item.findByIdAndUpdate(request.itemId, { availability: 'Available' });
    }

    res.status(200).json({ message: `Request updated to ${status}`, request: updatedRequest });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update request status', error: error.message });
  }
});

// DELETE /api/requests/:id - Delete a borrow request
router.delete('/:id', async (req, res) => {
  try {
    const deletedRequest = await BorrowRequest.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Borrow request not found' });
    }
    res.status(200).json({ message: 'Borrow request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete borrow request', error: error.message });
  }
});

module.exports = router;
