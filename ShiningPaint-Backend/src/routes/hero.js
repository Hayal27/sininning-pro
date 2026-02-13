const express = require('express');
const router = express.Router();
const { getHeroSection, updateHeroSection } = require('../controllers/heroController');
const { protect, authorize } = require('../middleware/auth');

// Get active hero section
router.get('/', getHeroSection);

// Update hero section (protected route in real app, public here for now or add auth middleware if available)
// router.put('/:id', protect, admin, updateHeroSection);
router.put('/:id', protect, authorize('owner', 'admin', 'manager'), updateHeroSection);

module.exports = router;
