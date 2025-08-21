const { pool } = require('../config/database');

// @desc    Get dashboard statistics
// @route   GET /api/analytics/dashboard
// @access  Private
const getDashboardStats = async (req, res, next) => {
  try {
    const { period = '30' } = req.query; // days
    const daysAgo = parseInt(period);

    // Get total revenue
    const [revenueResult] = await pool.execute(
      `SELECT 
        COALESCE(SUM(total_amount), 0) as total_revenue,
        COALESCE(SUM(CASE WHEN order_date >= DATE_SUB(NOW(), INTERVAL ? DAY) THEN total_amount ELSE 0 END), 0) as period_revenue
       FROM orders 
       WHERE status NOT IN ('cancelled')`,
      [daysAgo]
    );

    // Get previous period revenue for comparison
    const [prevRevenueResult] = await pool.execute(
      `SELECT COALESCE(SUM(total_amount), 0) as prev_revenue
       FROM orders 
       WHERE status NOT IN ('cancelled')
       AND order_date >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND order_date < DATE_SUB(NOW(), INTERVAL ? DAY)`,
      [daysAgo * 2, daysAgo]
    );

    // Get total orders
    const [ordersResult] = await pool.execute(
      `SELECT 
        COUNT(*) as total_orders,
        SUM(CASE WHEN order_date >= DATE_SUB(NOW(), INTERVAL ? DAY) THEN 1 ELSE 0 END) as period_orders
       FROM orders`,
      [daysAgo]
    );

    // Get previous period orders for comparison
    const [prevOrdersResult] = await pool.execute(
      `SELECT COUNT(*) as prev_orders
       FROM orders 
       WHERE order_date >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND order_date < DATE_SUB(NOW(), INTERVAL ? DAY)`,
      [daysAgo * 2, daysAgo]
    );

    // Get total customers
    const [customersResult] = await pool.execute(
      `SELECT 
        COUNT(*) as total_customers,
        SUM(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL ? DAY) THEN 1 ELSE 0 END) as period_customers
       FROM customers 
       WHERE is_active = true`,
      [daysAgo]
    );

    // Get total products
    const [productsResult] = await pool.execute(
      `SELECT 
        COUNT(*) as total_products,
        SUM(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL ? DAY) THEN 1 ELSE 0 END) as period_products
       FROM products 
       WHERE is_active = true`,
      [daysAgo]
    );

    // Calculate growth percentages
    const calculateGrowth = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const revenue = revenueResult[0];
    const prevRevenue = prevRevenueResult[0];
    const orders = ordersResult[0];
    const prevOrders = prevOrdersResult[0];
    const customers = customersResult[0];
    const products = productsResult[0];

    const stats = {
      revenue: {
        total: parseFloat(revenue.total_revenue),
        period: parseFloat(revenue.period_revenue),
        growth: calculateGrowth(parseFloat(revenue.period_revenue), parseFloat(prevRevenue.prev_revenue))
      },
      orders: {
        total: parseInt(orders.total_orders),
        period: parseInt(orders.period_orders),
        growth: calculateGrowth(parseInt(orders.period_orders), parseInt(prevOrders.prev_orders))
      },
      customers: {
        total: parseInt(customers.total_customers),
        period: parseInt(customers.period_customers),
        growth: customers.period_customers > 0 ? 100 : 0 // New customers are always growth
      },
      products: {
        total: parseInt(products.total_products),
        period: parseInt(products.period_products),
        growth: products.period_products > 0 ? 100 : 0 // New products are always growth
      }
    };

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get recent orders
// @route   GET /api/analytics/recent-orders
// @access  Private
const getRecentOrders = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const [orders] = await pool.execute(
      `SELECT o.id, o.order_number, o.status, o.total_amount, o.order_date,
              c.company_name, c.contact_person
       FROM orders o
       LEFT JOIN customers c ON o.customer_id = c.id
       ORDER BY o.order_date DESC
       LIMIT ?`,
      [limit]
    );

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get top selling products
// @route   GET /api/analytics/top-products
// @access  Private
const getTopProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const { period = '30' } = req.query; // days
    const daysAgo = parseInt(period);

    const [products] = await pool.execute(
      `SELECT p.id, p.name, p.sku, p.price,
              SUM(oi.quantity) as total_sold,
              SUM(oi.total_price) as total_revenue
       FROM products p
       INNER JOIN order_items oi ON p.id = oi.product_id
       INNER JOIN orders o ON oi.order_id = o.id
       WHERE o.status NOT IN ('cancelled')
       AND o.order_date >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY p.id, p.name, p.sku, p.price
       ORDER BY total_sold DESC
       LIMIT ?`,
      [daysAgo, limit]
    );

    res.status(200).json({
      success: true,
      data: products
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get low stock products
// @route   GET /api/analytics/low-stock
// @access  Private
const getLowStockProducts = async (req, res, next) => {
  try {
    const [products] = await pool.execute(
      `SELECT id, name, sku, stock_quantity, min_stock_level
       FROM products
       WHERE is_active = true
       AND stock_quantity <= min_stock_level
       ORDER BY (stock_quantity / min_stock_level) ASC`
    );

    res.status(200).json({
      success: true,
      data: products
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get sales chart data
// @route   GET /api/analytics/sales-chart
// @access  Private
const getSalesChart = async (req, res, next) => {
  try {
    const { period = '30' } = req.query; // days
    const daysAgo = parseInt(period);

    const [salesData] = await pool.execute(
      `SELECT 
        DATE(order_date) as date,
        COUNT(*) as orders,
        SUM(total_amount) as revenue
       FROM orders
       WHERE status NOT IN ('cancelled')
       AND order_date >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY DATE(order_date)
       ORDER BY date ASC`,
      [daysAgo]
    );

    res.status(200).json({
      success: true,
      data: salesData
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get order status distribution
// @route   GET /api/analytics/order-status
// @access  Private
const getOrderStatusDistribution = async (req, res, next) => {
  try {
    const [statusData] = await pool.execute(
      `SELECT status, COUNT(*) as count
       FROM orders
       GROUP BY status
       ORDER BY count DESC`
    );

    res.status(200).json({
      success: true,
      data: statusData
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getRecentOrders,
  getTopProducts,
  getLowStockProducts,
  getSalesChart,
  getOrderStatusDistribution
};
