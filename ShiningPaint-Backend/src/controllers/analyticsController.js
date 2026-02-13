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
      `SELECT p.id, p.name, p.sku, p.price, p.stock_quantity,
              SUM(oi.quantity) as total_sold,
              SUM(oi.total_price) as total_revenue
       FROM products p
       INNER JOIN order_items oi ON p.id = oi.product_id
       INNER JOIN orders o ON oi.order_id = o.id
       WHERE o.status NOT IN ('cancelled')
       AND o.order_date >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY p.id, p.name, p.sku, p.price, p.stock_quantity
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

// @desc    Get recent activity logs
// @route   GET /api/analytics/activity
// @access  Private
const getRecentActivity = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    // Get recent orders
    const [recentOrders] = await pool.execute(
      `SELECT 'order' as type, id, order_number as reference, total_amount as value, created_at, status
       FROM orders 
       ORDER BY created_at DESC LIMIT ?`,
      [limit]
    );

    // Get recent products
    const [recentProducts] = await pool.execute(
      `SELECT 'product' as type, id, name as reference, price as value, created_at, 'created' as status
       FROM products 
       ORDER BY created_at DESC LIMIT ?`,
      [limit]
    );

    // Get recent users
    const [recentUsers] = await pool.execute(
      `SELECT 'user' as type, id, CONCAT(first_name, ' ', last_name) as reference, role as value, created_at, 'joined' as status
       FROM users 
       ORDER BY created_at DESC LIMIT ?`,
      [limit]
    );

    // Get recent customers
    const [recentCustomers] = await pool.execute(
      `SELECT 'customer' as type, id, company_name as reference, contact_person as value, created_at, 'registered' as status
       FROM customers 
       ORDER BY created_at DESC LIMIT ?`,
      [limit]
    );

    // Combine and sort
    const allActivity = [
      ...recentOrders.map(o => ({
        id: `ord-${o.id}`,
        type: 'order',
        message: `Order #${o.reference} placed`,
        detail: `$${parseFloat(o.value).toFixed(2)}`,
        date: o.created_at,
        status: o.status
      })),
      ...recentProducts.map(p => ({
        id: `prod-${p.id}`,
        type: 'product',
        message: `Product "${p.reference}" added`,
        detail: `$${parseFloat(p.value).toFixed(2)}`,
        date: p.created_at,
        status: 'new'
      })),
      ...recentUsers.map(u => ({
        id: `user-${u.id}`,
        type: 'user',
        message: `New user ${u.reference}`,
        detail: u.value, // role
        date: u.created_at,
        status: 'active'
      })),
      ...recentCustomers.map(c => ({
        id: `cust-${c.id}`,
        type: 'customer',
        message: `New customer ${c.reference}`,
        detail: c.value, // contact person
        date: c.created_at,
        status: 'active'
      }))
    ];

    // Sort by date DESC and limit
    const sortedActivity = allActivity
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);

    res.status(200).json({
      success: true,
      data: sortedActivity
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get sales by category
// @route   GET /api/analytics/sales-by-category
// @access  Private
const getCategorySales = async (req, res, next) => {
  try {
    const { period = '30' } = req.query;
    const daysAgo = parseInt(period);

    const [categoryData] = await pool.execute(
      `SELECT c.name as category, COALESCE(SUM(oi.total_price), 0) as value
       FROM product_categories c
       LEFT JOIN products p ON c.id = p.category_id
       LEFT JOIN order_items oi ON p.id = oi.product_id
       LEFT JOIN orders o ON oi.order_id = o.id AND o.status NOT IN ('cancelled') AND o.order_date >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY c.id, c.name
       HAVING value > 0
       ORDER BY value DESC`,
      [daysAgo]
    );

    res.status(200).json({
      success: true,
      data: categoryData
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get message statistics
// @route   GET /api/analytics/message-stats
// @access  Private
const getMessageStats = async (req, res, next) => {
  try {
    // Status distribution
    const [statusDist] = await pool.execute(
      `SELECT status, COUNT(*) as count
       FROM contact_submissions
       GROUP BY status`
    );

    // General stats (Total, New)
    const [generalStats] = await pool.execute(
      `SELECT 
        COUNT(*) as total_messages,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_messages
       FROM contact_submissions`
    );

    res.status(200).json({
      success: true,
      data: {
        distribution: statusDist,
        stats: generalStats[0]
      }
    });

  } catch (error) {
    next(error);
  }
};

const getSalesByPriceRange = async (req, res, next) => {
  try {
    const { period = '30' } = req.query;
    const daysAgo = parseInt(period);

    const [priceData] = await pool.execute(
      `SELECT 
        CASE
          WHEN p.price < 40 THEN 'Under $40'
          WHEN p.price BETWEEN 40 AND 60 THEN '$40 - $60'
          ELSE 'Over $60'
        END as price_range,
        COALESCE(SUM(oi.total_price), 0) as value
       FROM products p
       LEFT JOIN order_items oi ON p.id = oi.product_id
       LEFT JOIN orders o ON oi.order_id = o.id AND o.status NOT IN ('cancelled') AND o.order_date >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY price_range
       HAVING value > 0
       ORDER BY value DESC`,
      [daysAgo]
    );

    res.status(200).json({
      success: true,
      data: priceData
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
  getOrderStatusDistribution,
  getRecentActivity,
  getCategorySales,
  getMessageStats,
  getSalesByPriceRange
};
