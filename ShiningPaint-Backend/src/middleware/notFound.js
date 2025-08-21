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
      upload: '/api/upload'
    }
  });
};

module.exports = notFound;
