const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'shiningpaint_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    // First try to connect without specifying database
    const tempConfig = { ...dbConfig };
    delete tempConfig.database;
    const tempPool = mysql.createPool(tempConfig);

    const connection = await tempPool.getConnection();

    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    console.log(`✅ Database '${dbConfig.database}' ensured to exist`);

    connection.release();
    tempPool.end();

    // Now test connection with the actual database
    const mainConnection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    mainConnection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize database and create tables
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();

    console.log('📊 Initializing database tables...');

    // Create tables
    await createTables(connection);

    connection.release();
    console.log('✅ Database initialization completed');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  }
};

// Create all necessary tables
const createTables = async (connection) => {
  // Users table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      role ENUM('admin', 'manager', 'employee') DEFAULT 'employee',
      phone VARCHAR(20),
      avatar VARCHAR(255),
      is_active BOOLEAN DEFAULT true,
      last_login TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_role (role),
      INDEX idx_active (is_active)
    )
  `);

  // Product categories table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS product_categories (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      parent_id INT NULL,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES product_categories(id) ON DELETE SET NULL,
      INDEX idx_parent (parent_id),
      INDEX idx_active (is_active)
    )
  `);

  // Products table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      sku VARCHAR(100) UNIQUE NOT NULL,
      category_id INT,
      price DECIMAL(10,2) NOT NULL,
      cost_price DECIMAL(10,2),
      stock_quantity INT DEFAULT 0,
      min_stock_level INT DEFAULT 10,
      max_stock_level INT DEFAULT 1000,
      unit VARCHAR(50) DEFAULT 'liters',
      color_code VARCHAR(7),
      finish_type VARCHAR(50),
      coverage_area DECIMAL(8,2),
      drying_time VARCHAR(100),
      images JSON,
      specifications JSON,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE SET NULL,
      INDEX idx_sku (sku),
      INDEX idx_category (category_id),
      INDEX idx_active (is_active),
      INDEX idx_stock (stock_quantity)
    )
  `);

  // Customers table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS customers (
      id INT PRIMARY KEY AUTO_INCREMENT,
      company_name VARCHAR(255),
      contact_person VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(20),
      address TEXT,
      city VARCHAR(100),
      state VARCHAR(100),
      postal_code VARCHAR(20),
      country VARCHAR(100) DEFAULT 'USA',
      customer_type ENUM('retail', 'wholesale', 'contractor') DEFAULT 'retail',
      credit_limit DECIMAL(12,2) DEFAULT 0,
      payment_terms VARCHAR(50) DEFAULT 'net_30',
      tax_id VARCHAR(50),
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_type (customer_type),
      INDEX idx_active (is_active)
    )
  `);

  // Orders table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT PRIMARY KEY AUTO_INCREMENT,
      order_number VARCHAR(50) UNIQUE NOT NULL,
      customer_id INT NOT NULL,
      user_id INT,
      status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      required_date DATE,
      shipped_date TIMESTAMP NULL,
      subtotal DECIMAL(12,2) NOT NULL,
      tax_amount DECIMAL(12,2) DEFAULT 0,
      shipping_amount DECIMAL(12,2) DEFAULT 0,
      discount_amount DECIMAL(12,2) DEFAULT 0,
      total_amount DECIMAL(12,2) NOT NULL,
      payment_status ENUM('pending', 'partial', 'paid', 'refunded') DEFAULT 'pending',
      payment_method VARCHAR(50),
      shipping_address JSON,
      billing_address JSON,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_order_number (order_number),
      INDEX idx_customer (customer_id),
      INDEX idx_status (status),
      INDEX idx_date (order_date)
    )
  `);

  // Order items table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INT PRIMARY KEY AUTO_INCREMENT,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL,
      unit_price DECIMAL(10,2) NOT NULL,
      total_price DECIMAL(12,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      INDEX idx_order (order_id),
      INDEX idx_product (product_id)
    )
  `);

  // Inventory transactions table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS inventory_transactions (
      id INT PRIMARY KEY AUTO_INCREMENT,
      product_id INT NOT NULL,
      transaction_type ENUM('in', 'out', 'adjustment') NOT NULL,
      quantity INT NOT NULL,
      reference_type ENUM('purchase', 'sale', 'adjustment', 'return') NOT NULL,
      reference_id INT,
      notes TEXT,
      user_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_product (product_id),
      INDEX idx_type (transaction_type),
      INDEX idx_date (created_at)
    )
  `);

  console.log('✅ All database tables created successfully');
};

module.exports = {
  pool,
  testConnection,
  initializeDatabase
};
