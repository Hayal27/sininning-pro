const { pool } = require('../config/database');

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private
const getCustomers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const type = req.query.type || '';
    const status = req.query.status || '';

    // Build WHERE clause
    let whereClause = 'WHERE 1=1';
    const queryParams = [];

    if (search) {
      whereClause += ' AND (company_name LIKE ? OR contact_person LIKE ? OR email LIKE ?)';
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (type) {
      whereClause += ' AND customer_type = ?';
      queryParams.push(type);
    }

    if (status) {
      const isActive = status === 'active';
      whereClause += ' AND is_active = ?';
      queryParams.push(isActive);
    }

    // Get total count
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM customers ${whereClause}`,
      queryParams
    );
    const total = countResult[0].total;

    // Get customers
    const [customers] = await pool.execute(
      `SELECT * FROM customers ${whereClause} 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    res.status(200).json({
      success: true,
      data: customers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get single customer
// @route   GET /api/customers/:id
// @access  Private
const getCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [customers] = await pool.execute(
      'SELECT * FROM customers WHERE id = ?',
      [id]
    );

    if (customers.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found'
      });
    }

    // Get customer's order history
    const [orders] = await pool.execute(
      `SELECT id, order_number, status, total_amount, order_date 
       FROM orders WHERE customer_id = ? 
       ORDER BY order_date DESC 
       LIMIT 10`,
      [id]
    );

    const customer = customers[0];
    customer.recent_orders = orders;

    res.status(200).json({
      success: true,
      data: customer
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Create customer
// @route   POST /api/customers
// @access  Private
const createCustomer = async (req, res, next) => {
  try {
    const {
      company_name,
      contact_person,
      email,
      phone,
      address,
      city,
      state,
      postal_code,
      country = 'USA',
      customer_type = 'retail',
      credit_limit = 0,
      payment_terms = 'net_30',
      tax_id
    } = req.body;

    // Check if customer already exists
    const [existingCustomers] = await pool.execute(
      'SELECT id FROM customers WHERE email = ?',
      [email]
    );

    if (existingCustomers.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Customer with this email already exists'
      });
    }

    // Create customer
    const [result] = await pool.execute(
      `INSERT INTO customers (
        company_name, contact_person, email, phone, address, city, state,
        postal_code, country, customer_type, credit_limit, payment_terms, tax_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        company_name, contact_person, email, phone, address, city, state,
        postal_code, country, customer_type, credit_limit, payment_terms, tax_id
      ]
    );

    // Get created customer
    const [customers] = await pool.execute(
      'SELECT * FROM customers WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      data: customers[0]
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Update customer
// @route   PUT /api/customers/:id
// @access  Private
const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if customer exists
    const [existingCustomers] = await pool.execute(
      'SELECT id FROM customers WHERE id = ?',
      [id]
    );

    if (existingCustomers.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found'
      });
    }

    // Check if email is being changed and if it already exists
    if (updateData.email) {
      const [emailCheck] = await pool.execute(
        'SELECT id FROM customers WHERE email = ? AND id != ?',
        [updateData.email, id]
      );

      if (emailCheck.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Email is already taken by another customer'
        });
      }
    }

    // Build update query
    const updateFields = [];
    const updateValues = [];

    const allowedFields = [
      'company_name', 'contact_person', 'email', 'phone', 'address',
      'city', 'state', 'postal_code', 'country', 'customer_type',
      'credit_limit', 'payment_terms', 'tax_id', 'is_active'
    ];

    allowedFields.forEach(field => {
      if (updateData[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        updateValues.push(updateData[field]);
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No fields to update'
      });
    }

    updateValues.push(id);

    // Update customer
    await pool.execute(
      `UPDATE customers SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Get updated customer
    const [customers] = await pool.execute(
      'SELECT * FROM customers WHERE id = ?',
      [id]
    );

    res.status(200).json({
      success: true,
      data: customers[0]
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private (Admin)
const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if customer exists
    const [existingCustomers] = await pool.execute(
      'SELECT id FROM customers WHERE id = ?',
      [id]
    );

    if (existingCustomers.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found'
      });
    }

    // Soft delete - deactivate customer instead of hard delete
    await pool.execute(
      'UPDATE customers SET is_active = false WHERE id = ?',
      [id]
    );

    res.status(200).json({
      success: true,
      message: 'Customer deactivated successfully'
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
