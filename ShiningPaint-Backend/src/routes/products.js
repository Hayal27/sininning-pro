const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { protect, authorize } = require('../middleware/auth');
const { validationRules, handleValidationErrors } = require('../utils/validation');

const router = express.Router();

// Public routes (no authentication required)
// Get all products - Public access for browsing
router.get('/',
  validationRules.pagination,
  handleValidationErrors,
  getProducts
);

// Get single product - Public access for viewing
router.get('/:id',
  validationRules.idParam,
  handleValidationErrors,
  getProduct
);

// All other routes are protected and require authentication
router.use(protect);

// Create product - Admin and Manager only
router.post('/',
  authorize('admin', 'manager'),
  validationRules.productCreate,
  handleValidationErrors,
  createProduct
);

// Update product - Admin and Manager only
router.put('/:id',
  authorize('admin', 'manager'),
  [
    ...validationRules.idParam,
    // Optional validation for update
    require('express-validator').body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage('Product name must be between 2 and 255 characters'),
    require('express-validator').body('sku')
      .optional()
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('SKU must be between 3 and 100 characters'),
    require('express-validator').body('price')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number')
  ],
  handleValidationErrors,
  updateProduct
);

// Delete product - Admin only
router.delete('/:id',
  authorize('admin'),
  validationRules.idParam,
  handleValidationErrors,
  deleteProduct
);

module.exports = router;
