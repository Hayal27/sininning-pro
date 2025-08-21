const { body, param, query, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  
  next();
};

// Common validation rules
const validationRules = {
  // User validation
  userRegistration: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('first_name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('First name must be between 2 and 50 characters'),
    body('last_name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Last name must be between 2 and 50 characters'),
    body('role')
      .optional()
      .isIn(['admin', 'manager', 'employee'])
      .withMessage('Role must be admin, manager, or employee')
  ],

  userLogin: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ],

  userUpdate: [
    body('email')
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('first_name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('First name must be between 2 and 50 characters'),
    body('last_name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Last name must be between 2 and 50 characters'),
    body('role')
      .optional()
      .isIn(['admin', 'manager', 'employee'])
      .withMessage('Role must be admin, manager, or employee')
  ],

  // Product validation
  productCreate: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage('Product name must be between 2 and 255 characters'),
    body('sku')
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('SKU must be between 3 and 100 characters'),
    body('price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('stock_quantity')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Stock quantity must be a non-negative integer'),
    body('category_id')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Category ID must be a positive integer')
  ],

  // Customer validation
  customerCreate: [
    body('contact_person')
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage('Contact person name must be between 2 and 255 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('customer_type')
      .optional()
      .isIn(['retail', 'wholesale', 'contractor'])
      .withMessage('Customer type must be retail, wholesale, or contractor'),
    body('credit_limit')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Credit limit must be a non-negative number')
  ],

  // Order validation
  orderCreate: [
    body('customer_id')
      .isInt({ min: 1 })
      .withMessage('Customer ID must be a positive integer'),
    body('items')
      .isArray({ min: 1 })
      .withMessage('Order must contain at least one item'),
    body('items.*.product_id')
      .isInt({ min: 1 })
      .withMessage('Product ID must be a positive integer'),
    body('items.*.quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be a positive integer'),
    body('items.*.unit_price')
      .isFloat({ min: 0 })
      .withMessage('Unit price must be a non-negative number')
  ],

  // Common parameter validation
  idParam: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('ID must be a positive integer')
  ],

  // Pagination validation
  pagination: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),
    query('sort')
      .optional()
      .isString()
      .withMessage('Sort must be a string'),
    query('order')
      .optional()
      .isIn(['asc', 'desc'])
      .withMessage('Order must be asc or desc')
  ]
};

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation
const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone);
};

// SKU validation
const isValidSKU = (sku) => {
  const skuRegex = /^[A-Z0-9\-_]{3,50}$/;
  return skuRegex.test(sku);
};

module.exports = {
  validationRules,
  handleValidationErrors,
  isValidEmail,
  isValidPhone,
  isValidSKU
};
