const express = require('express');
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  logout
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');
const { validationRules, handleValidationErrors } = require('../utils/validation');

const router = express.Router();

// Public routes
router.post('/register', 
  validationRules.userRegistration,
  handleValidationErrors,
  register
);

router.post('/login',
  validationRules.userLogin,
  handleValidationErrors,
  login
);

// Protected routes
router.get('/me', protect, getMe);

router.put('/profile',
  protect,
  validationRules.userUpdate,
  handleValidationErrors,
  updateProfile
);

router.put('/password',
  protect,
  [
    require('express-validator').body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    require('express-validator').body('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters long')
  ],
  handleValidationErrors,
  changePassword
);

router.post('/logout', protect, logout);

module.exports = router;
