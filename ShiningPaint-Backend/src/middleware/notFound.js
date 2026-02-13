const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist`,
    availableEndpoints: {
      auth: '/api/auth',
      users: '/api/users',
      products: '/api/products',
      orders: '/api/orders',
      customers: '/api/customers',
      analytics: '/api/analytics',
      upload: '/api/upload',
      news: '/api/news',
      careers: '/api/careers',
      hero: '/api/hero',
      settings: '/api/settings',
      offices: '/api/offices',
      contact: '/api/contact',
      subscriptions: '/api/subscriptions'
    }
  });
};

module.exports = notFound;
