const express = require('express');
const {
  uploadSingle,
  uploadMultiple,
  deleteFile,
  getFileInfo
} = require('../controllers/uploadController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// Upload single file - All authenticated users
router.post('/single', uploadSingle);

// Upload multiple files - All authenticated users
router.post('/multiple', uploadMultiple);

// Get file info - All authenticated users
router.get('/:fileName', getFileInfo);

// Delete file - Admin and Manager only
router.delete('/:fileName', authorize('admin', 'manager'), deleteFile);

module.exports = router;
