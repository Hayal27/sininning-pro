const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  resetPassword
} = require('../controllers/userController');

const { protect, authorize } = require('../middleware/auth');
const { validationRules, handleValidationErrors } = require('../utils/validation');

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// Get all users - Admin and Manager only
router.get('/',
  authorize('admin', 'manager'),
  validationRules.pagination,
  handleValidationErrors,
  getUsers
);

// Get single user - Admin and Manager only
router.get('/:id',
  authorize('admin', 'manager'),
  validationRules.idParam,
  handleValidationErrors,
  getUser
);

// Create user - Admin only
router.post('/',
  authorize('admin'),
  validationRules.userRegistration,
  handleValidationErrors,
  createUser
);

// Update user - Admin and Manager only
router.put('/:id',
  authorize('admin', 'manager'),
  [
    ...validationRules.idParam,
    ...validationRules.userUpdate
  ],
  handleValidationErrors,
  updateUser
);

// Delete user - Admin only
router.delete('/:id',
  authorize('admin'),
  validationRules.idParam,
  handleValidationErrors,
  deleteUser
);

// Reset user password - Admin only
router.post('/:id/reset-password',
  authorize('admin'),
  validationRules.idParam,
  handleValidationErrors,
  resetPassword
);

module.exports = router;
