const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const { testConnection, initializeDatabase } = require('./src/config/database');
const { seedDatabase } = require('./src/utils/seeder');

// Import routes
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');
const productRoutes = require('./src/routes/products');
const orderRoutes = require('./src/routes/orders');
const customerRoutes = require('./src/routes/customers');
const analyticsRoutes = require('./src/routes/analytics');
const uploadRoutes = require('./src/routes/upload');
// const contactRoutes = require('./src/routes/contact'); // TODO: Add back when working

// Import middleware
const errorHandler = require('./src/middleware/errorHandler');
const notFound = require('./src/middleware/notFound');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:3000',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// File upload middleware
app.use(fileUpload({
  limits: { 
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB
  },
  abortOnLimit: true,
  responseOnLimit: 'File size limit exceeded'
}));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Serve static files
app.use('/uploads', express.static('uploads'));
app.use('/public', express.static('public'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'ShiningPaint Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/contact', contactRoutes); // PUBLIC - No authentication required
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/upload', uploadRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'ShiningPaint Manufacturing Admin Dashboard API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      products: '/api/products',
      orders: '/api/orders',
      customers: '/api/customers',
      analytics: '/api/analytics',
      upload: '/api/upload'
    },
    documentation: 'https://github.com/shiningpaint/admin-dashboard-api'
  });
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    console.log('🚀 Starting ShiningPaint Backend Server...');
    
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Please check your database configuration.');
      process.exit(1);
    }
    
    // Initialize database tables
    await initializeDatabase();

    // Seed database with initial data
    if (process.env.NODE_ENV === 'development') {
      await seedDatabase();
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
      console.log(`📊 Database: ${process.env.DB_NAME}`);
      console.log(`🔗 API URL: http://localhost:${PORT}/api`);
      console.log(`💚 Health Check: http://localhost:${PORT}/health`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();
