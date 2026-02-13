const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect, authorize } = require('../middleware/auth');

// Public route to get settings
router.get('/', getSettings);

// Protected route to update settings
router.put('/', protect, authorize('owner', 'admin', 'manager'), updateSettings);

module.exports = router;
