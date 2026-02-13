const express = require('express');
const router = express.Router();
const { getOffices, createOffice, updateOffice, deleteOffice } = require('../controllers/officesController');
const { protect, authorize } = require('../middleware/auth');

// Public route
router.get('/', getOffices);

// Private routes
router.post('/', protect, authorize('owner', 'admin', 'manager'), createOffice);
router.put('/:id', protect, authorize('owner', 'admin', 'manager'), updateOffice);
router.delete('/:id', protect, authorize('owner', 'admin'), deleteOffice);

module.exports = router;
