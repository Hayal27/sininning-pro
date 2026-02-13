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

// Get all users - Admin, Owner and Manager only
router.get('/',
  authorize('owner', 'admin', 'manager'),
  validationRules.pagination,
  handleValidationErrors,
  getUsers
);

// Get single user - Admin, Owner and Manager only
router.get('/:id',
  authorize('owner', 'admin', 'manager'),
  validationRules.idParam,
  handleValidationErrors,
  getUser
);

// Create user - Admin and Owner only
router.post('/',
  authorize('owner', 'admin'),
  validationRules.userRegistration,
  handleValidationErrors,
  createUser
);

// Update user - Admin, Owner and Manager only
router.put('/:id',
  authorize('owner', 'admin', 'manager'),
  [
    ...validationRules.idParam,
    ...validationRules.userUpdate
  ],
  handleValidationErrors,
  updateUser
);

// Delete user - Admin and Owner only
router.delete('/:id',
  authorize('owner', 'admin'),
  validationRules.idParam,
  handleValidationErrors,
  deleteUser
);

// Reset user password - Admin and Owner only
router.post('/:id/reset-password',
  authorize('owner', 'admin'),
  validationRules.idParam,
  handleValidationErrors,
  resetPassword
);

module.exports = router;
