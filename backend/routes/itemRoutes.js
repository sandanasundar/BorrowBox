const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const BorrowRequest = require('../models/BorrowRequest');

// GET /api/items - Fetch all items with optional search & category query params
router.get('/', async (req, res) => {
  try {
    const { category, search, ownerName } = req.query;
    let query = {};

    // Filter by category if specified and not 'All'
    if (category && category !== 'All') {
      query.category = category;
    }

    // Filter by search string in item name
    if (search) {
      query.itemName = { $regex: search, $options: 'i' };
    }

    // Filter by owner name (used in My Items page)
    if (ownerName) {
      query.ownerName = { $regex: ownerName, $options: 'i' };
    }

    const items = await Item.find(query).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items', error: error.message });
  }
});

// GET /api/items/:id - Fetch single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch item details', error: error.message });
  }
});

// POST /api/items - Add a new item
router.post('/', async (req, res) => {
  try {
    const { itemName, category, description, ownerName, ownerDepartment, ownerYear, condition } = req.body;

    // Basic required fields validation
    if (!itemName || !category || !description || !ownerName || !ownerDepartment || !ownerYear || !condition) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newItem = new Item({
      itemName,
      category,
      description,
      ownerName,
      ownerDepartment,
      ownerYear,
      condition,
      availability: 'Available'
    });

    const savedItem = await newItem.save();
    res.status(201).json({ message: 'Item listed successfully', item: savedItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create item', error: error.message });
  }
});

// PUT /api/items/:id - Update an item
router.put('/:id', async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item', error: error.message });
  }
});

// DELETE /api/items/:id - Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Delete associated borrow requests as well
    await BorrowRequest.deleteMany({ itemId: req.params.id });

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item', error: error.message });
  }
});

module.exports = router;
