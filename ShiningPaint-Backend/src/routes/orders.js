const express = require('express');
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus
} = require('../controllers/orderController');

const { protect, authorize } = require('../middleware/auth');
const { validationRules, handleValidationErrors } = require('../utils/validation');

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// Get all orders - All authenticated users
router.get('/',
  validationRules.pagination,
  handleValidationErrors,
  getOrders
);

// Get single order - All authenticated users
router.get('/:id',
  validationRules.idParam,
  handleValidationErrors,
  getOrder
);

// Create order - All authenticated users
router.post('/',
  validationRules.orderCreate,
  handleValidationErrors,
  createOrder
);

// Update order status - Admin, Owner and Manager only
router.put('/:id/status',
  authorize('owner', 'admin', 'manager'),
  [
    ...validationRules.idParam,
    require('express-validator').body('status')
      .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])
      .withMessage('Invalid status')
  ],
  handleValidationErrors,
  updateOrderStatus
);

module.exports = router;
