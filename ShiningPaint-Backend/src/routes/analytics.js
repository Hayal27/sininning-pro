const express = require('express');
const {
  getDashboardStats,
  getRecentOrders,
  getTopProducts,
  getLowStockProducts,
  getSalesChart,
  getOrderStatusDistribution,
  getRecentActivity,
  getCategorySales,
  getMessageStats,
  getSalesByPriceRange
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

// Sales chart data - Admin, Owner and Manager only
router.get('/sales-chart', authorize('owner', 'admin', 'manager'), getSalesChart);

// Order status distribution - Admin, Owner and Manager only
router.get('/order-status', authorize('owner', 'admin', 'manager'), getOrderStatusDistribution);

// Activity logs - All authenticated users
router.get('/activity', getRecentActivity);

// Sales by category - Admin, Owner and Manager only
router.get('/sales-by-category', authorize('owner', 'admin', 'manager'), getCategorySales);

// Message stats - Admin, Owner and Manager, and Content Manager
router.get('/message-stats', authorize('owner', 'admin', 'manager', 'content-manager'), getMessageStats);

// Sales by price range - Admin, Owner and Manager only
router.get('/sales-by-price', authorize('owner', 'admin', 'manager'), getSalesByPriceRange);

module.exports = router;
