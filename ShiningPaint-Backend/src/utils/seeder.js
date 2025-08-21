const { pool } = require('../config/database');
const { hashPassword } = require('./password');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const adminPassword = await hashPassword('admin123');
    await pool.execute(
      `INSERT IGNORE INTO users (email, password, first_name, last_name, role, phone) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['admin@shiningpaint.com', adminPassword, 'Admin', 'User', 'admin', '+1-555-0001']
    );

    // Create manager user
    const managerPassword = await hashPassword('manager123');
    await pool.execute(
      `INSERT IGNORE INTO users (email, password, first_name, last_name, role, phone) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['manager@shiningpaint.com', managerPassword, 'Manager', 'User', 'manager', '+1-555-0002']
    );

    // Create employee user
    const employeePassword = await hashPassword('employee123');
    await pool.execute(
      `INSERT IGNORE INTO users (email, password, first_name, last_name, role, phone) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['employee@shiningpaint.com', employeePassword, 'Employee', 'User', 'employee', '+1-555-0003']
    );

    // Create product categories
    const categories = [
      { name: 'Interior Paint', description: 'Paint for interior walls and surfaces' },
      { name: 'Exterior Paint', description: 'Weather-resistant paint for outdoor use' },
      { name: 'Primer', description: 'Base coats and primers' },
      { name: 'Specialty Paint', description: 'Specialty and decorative paints' },
      { name: 'Paint Supplies', description: 'Brushes, rollers, and painting accessories' }
    ];

    for (const category of categories) {
      await pool.execute(
        `INSERT IGNORE INTO product_categories (name, description) VALUES (?, ?)`,
        [category.name, category.description]
      );
    }

    // Get category IDs
    const [categoryRows] = await pool.execute('SELECT id, name FROM product_categories');
    const categoryMap = {};
    categoryRows.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });

    // Create sample products
    const products = [
      {
        name: 'Premium Interior Latex Paint - White',
        description: 'High-quality latex paint perfect for interior walls',
        sku: 'PIL-WHT-001',
        category_id: categoryMap['Interior Paint'],
        price: 45.99,
        cost_price: 28.50,
        stock_quantity: 150,
        unit: 'gallons',
        color_code: '#FFFFFF',
        finish_type: 'Satin',
        coverage_area: 400,
        drying_time: '2-4 hours'
      },
      {
        name: 'Exterior Acrylic Paint - Blue',
        description: 'Weather-resistant acrylic paint for exterior surfaces',
        sku: 'EAP-BLU-002',
        category_id: categoryMap['Exterior Paint'],
        price: 52.99,
        cost_price: 32.00,
        stock_quantity: 85,
        unit: 'gallons',
        color_code: '#0066CC',
        finish_type: 'Semi-gloss',
        coverage_area: 350,
        drying_time: '4-6 hours'
      },
      {
        name: 'Multi-Surface Primer',
        description: 'Universal primer for various surfaces',
        sku: 'MSP-WHT-003',
        category_id: categoryMap['Primer'],
        price: 38.99,
        cost_price: 24.00,
        stock_quantity: 120,
        unit: 'gallons',
        color_code: '#F5F5F5',
        finish_type: 'Flat',
        coverage_area: 450,
        drying_time: '1-2 hours'
      },
      {
        name: 'Metallic Finish Paint - Gold',
        description: 'Decorative metallic finish paint',
        sku: 'MFP-GLD-004',
        category_id: categoryMap['Specialty Paint'],
        price: 68.99,
        cost_price: 42.00,
        stock_quantity: 45,
        unit: 'quarts',
        color_code: '#FFD700',
        finish_type: 'Metallic',
        coverage_area: 100,
        drying_time: '6-8 hours'
      },
      {
        name: 'Professional Paint Brush Set',
        description: 'Set of 5 professional-grade paint brushes',
        sku: 'PBS-PRO-005',
        category_id: categoryMap['Paint Supplies'],
        price: 24.99,
        cost_price: 15.00,
        stock_quantity: 200,
        unit: 'sets',
        color_code: null,
        finish_type: null,
        coverage_area: null,
        drying_time: null
      }
    ];

    for (const product of products) {
      await pool.execute(
        `INSERT IGNORE INTO products (
          name, description, sku, category_id, price, cost_price, stock_quantity,
          unit, color_code, finish_type, coverage_area, drying_time, images, specifications
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.name, product.description, product.sku, product.category_id,
          product.price, product.cost_price, product.stock_quantity, product.unit,
          product.color_code, product.finish_type, product.coverage_area, product.drying_time,
          JSON.stringify([]), JSON.stringify({})
        ]
      );
    }

    // Create sample customers
    const customers = [
      {
        company_name: 'ABC Construction Co.',
        contact_person: 'John Smith',
        email: 'john@abcconstruction.com',
        phone: '+1-555-1001',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        customer_type: 'contractor',
        credit_limit: 10000
      },
      {
        company_name: 'Home Depot Store #1234',
        contact_person: 'Sarah Johnson',
        email: 'sarah@homedepot.com',
        phone: '+1-555-1002',
        address: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        postal_code: '90001',
        customer_type: 'wholesale',
        credit_limit: 50000
      },
      {
        company_name: null,
        contact_person: 'Mike Wilson',
        email: 'mike.wilson@email.com',
        phone: '+1-555-1003',
        address: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        postal_code: '60601',
        customer_type: 'retail',
        credit_limit: 1000
      }
    ];

    for (const customer of customers) {
      await pool.execute(
        `INSERT IGNORE INTO customers (
          company_name, contact_person, email, phone, address, city, state,
          postal_code, customer_type, credit_limit
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          customer.company_name, customer.contact_person, customer.email, customer.phone,
          customer.address, customer.city, customer.state, customer.postal_code,
          customer.customer_type, customer.credit_limit
        ]
      );
    }

    console.log('✅ Database seeding completed successfully!');
    console.log('📋 Created:');
    console.log('   - 3 users (admin, manager, employee)');
    console.log('   - 5 product categories');
    console.log('   - 5 sample products');
    console.log('   - 3 sample customers');
    console.log('');
    console.log('🔑 Login credentials:');
    console.log('   Admin: admin@shiningpaint.com / admin123');
    console.log('   Manager: manager@shiningpaint.com / manager123');
    console.log('   Employee: employee@shiningpaint.com / employee123');

  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
    throw error;
  }
};

module.exports = { seedDatabase };
