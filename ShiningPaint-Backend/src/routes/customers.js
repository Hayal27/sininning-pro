const express = require('express');
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerController');

const { protect, authorize } = require('../middleware/auth');
const { validationRules, handleValidationErrors } = require('../utils/validation');

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// Get all customers - All authenticated users
router.get('/',
  validationRules.pagination,
  handleValidationErrors,
  getCustomers
);

// Get single customer - All authenticated users
router.get('/:id',
  validationRules.idParam,
  handleValidationErrors,
  getCustomer
);

// Create customer - All authenticated users
router.post('/',
  validationRules.customerCreate,
  handleValidationErrors,
  createCustomer
);

// Update customer - All authenticated users
router.put('/:id',
  [
    ...validationRules.idParam,
    require('express-validator').body('contact_person')
      .optional()
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage('Contact person name must be between 2 and 255 characters'),
    require('express-validator').body('email')
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email')
  ],
  handleValidationErrors,
  updateCustomer
);

// Delete customer - Admin and Owner only
router.delete('/:id',
  authorize('owner', 'admin'),
  validationRules.idParam,
  handleValidationErrors,
  deleteCustomer
);

module.exports = router;
