const express = require('express');
const {
  getDashboardStats,
  getRecentOrders,
  getTopProducts,
  getLowStockProducts,
  getSalesChart,
  getOrderStatusDistribution
} = require('../controllers/analyticsController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// Dashboard statistics - All authenticated users
router.get('/dashboard', getDashboardStats);

// Recent orders - All authenticated users
router.get('/recent-orders', getRecentOrders);

// Top selling products - All authenticated users
router.get('/top-products', getTopProducts);

// Low stock products - All authenticated users
router.get('/low-stock', getLowStockProducts);

// Sales chart data - Admin and Manager only
router.get('/sales-chart', authorize('admin', 'manager'), getSalesChart);

// Order status distribution - Admin and Manager only
router.get('/order-status', authorize('admin', 'manager'), getOrderStatusDistribution);

module.exports = router;
