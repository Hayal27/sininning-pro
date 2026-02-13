const express = require('express');
const { subscribe, getSubscriptions } = require('../controllers/subscriptionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public route to subscribe
router.post('/subscribe', subscribe);

// Admin/Manager route to view subscriptions
router.get('/', protect, authorize('owner', 'admin', 'manager', 'content-manager'), getSubscriptions);

module.exports = router;
