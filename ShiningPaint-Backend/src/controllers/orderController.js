const { pool } = require('../config/database');

// Generate order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp.slice(-6)}${random}`;
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const status = req.query.status || '';
    const customer = req.query.customer || '';

    // Build WHERE clause
    let whereClause = 'WHERE 1=1';
    const queryParams = [];

    if (search) {
      whereClause += ' AND (o.order_number LIKE ? OR c.company_name LIKE ? OR c.contact_person LIKE ?)';
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status) {
      whereClause += ' AND o.status = ?';
      queryParams.push(status);
    }

    if (customer) {
      whereClause += ' AND o.customer_id = ?';
      queryParams.push(customer);
    }

    // Get total count
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM orders o 
       LEFT JOIN customers c ON o.customer_id = c.id 
       ${whereClause}`,
      queryParams
    );
    const total = countResult[0].total;

    // Get orders with customer information
    const [orders] = await pool.execute(
      `SELECT o.*, 
              c.company_name, c.contact_person, c.email as customer_email,
              u.first_name as user_first_name, u.last_name as user_last_name
       FROM orders o 
       LEFT JOIN customers c ON o.customer_id = c.id 
       LEFT JOIN users u ON o.user_id = u.id
       ${whereClause} 
       ORDER BY o.created_at DESC 
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    // Parse JSON fields and get order items
    const formattedOrders = await Promise.all(orders.map(async (order) => {
      // Parse JSON fields
      order.shipping_address = order.shipping_address ? JSON.parse(order.shipping_address) : null;
      order.billing_address = order.billing_address ? JSON.parse(order.billing_address) : null;

      // Get order items
      const [items] = await pool.execute(
        `SELECT oi.*, p.name as product_name, p.sku 
         FROM order_items oi 
         LEFT JOIN products p ON oi.product_id = p.id 
         WHERE oi.order_id = ?`,
        [order.id]
      );

      order.items = items;
      return order;
    }));

    res.status(200).json({
      success: true,
      data: formattedOrders,
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

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [orders] = await pool.execute(
      `SELECT o.*, 
              c.company_name, c.contact_person, c.email as customer_email, c.phone as customer_phone,
              u.first_name as user_first_name, u.last_name as user_last_name
       FROM orders o 
       LEFT JOIN customers c ON o.customer_id = c.id 
       LEFT JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`,
      [id]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    const order = orders[0];
    
    // Parse JSON fields
    order.shipping_address = order.shipping_address ? JSON.parse(order.shipping_address) : null;
    order.billing_address = order.billing_address ? JSON.parse(order.billing_address) : null;

    // Get order items
    const [items] = await pool.execute(
      `SELECT oi.*, p.name as product_name, p.sku, p.unit 
       FROM order_items oi 
       LEFT JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = ?`,
      [id]
    );

    order.items = items;

    res.status(200).json({
      success: true,
      data: order
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Create order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    const {
      customer_id,
      items,
      required_date,
      shipping_address,
      billing_address,
      notes,
      payment_method,
      discount_amount = 0,
      shipping_amount = 0,
      tax_rate = 0.08 // 8% tax
    } = req.body;

    // Validate customer
    const [customers] = await connection.execute(
      'SELECT id FROM customers WHERE id = ? AND is_active = true',
      [customer_id]
    );

    if (customers.length === 0) {
      throw new Error('Invalid customer ID');
    }

    // Calculate totals
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const [products] = await connection.execute(
        'SELECT id, name, price, stock_quantity FROM products WHERE id = ? AND is_active = true',
        [item.product_id]
      );

      if (products.length === 0) {
        throw new Error(`Product with ID ${item.product_id} not found`);
      }

      const product = products[0];
      
      // Check stock availability
      if (product.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}. Available: ${product.stock_quantity}, Requested: ${item.quantity}`);
      }

      const unitPrice = item.unit_price || product.price;
      const totalPrice = unitPrice * item.quantity;
      
      validatedItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: totalPrice
      });

      subtotal += totalPrice;
    }

    const taxAmount = subtotal * tax_rate;
    const totalAmount = subtotal + taxAmount + shipping_amount - discount_amount;

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Create order
    const [orderResult] = await connection.execute(
      `INSERT INTO orders (
        order_number, customer_id, user_id, required_date,
        subtotal, tax_amount, shipping_amount, discount_amount, total_amount,
        payment_method, shipping_address, billing_address, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNumber, customer_id, req.user.id, required_date,
        subtotal, taxAmount, shipping_amount, discount_amount, totalAmount,
        payment_method, 
        shipping_address ? JSON.stringify(shipping_address) : null,
        billing_address ? JSON.stringify(billing_address) : null,
        notes
      ]
    );

    const orderId = orderResult.insertId;

    // Create order items and update inventory
    for (const item of validatedItems) {
      // Create order item
      await connection.execute(
        'INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.unit_price, item.total_price]
      );

      // Update product stock
      await connection.execute(
        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );

      // Create inventory transaction
      await connection.execute(
        `INSERT INTO inventory_transactions (
          product_id, transaction_type, quantity, reference_type, reference_id, user_id
        ) VALUES (?, 'out', ?, 'sale', ?, ?)`,
        [item.product_id, item.quantity, orderId, req.user.id]
      );
    }

    await connection.commit();

    // Get created order
    const [orders] = await pool.execute(
      `SELECT o.*, 
              c.company_name, c.contact_person, c.email as customer_email
       FROM orders o 
       LEFT JOIN customers c ON o.customer_id = c.id 
       WHERE o.id = ?`,
      [orderId]
    );

    const order = orders[0];
    order.shipping_address = order.shipping_address ? JSON.parse(order.shipping_address) : null;
    order.billing_address = order.billing_address ? JSON.parse(order.billing_address) : null;
    order.items = validatedItems;

    res.status(201).json({
      success: true,
      data: order
    });

  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }

    // Check if order exists
    const [existingOrders] = await pool.execute(
      'SELECT id, status FROM orders WHERE id = ?',
      [id]
    );

    if (existingOrders.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Update order status
    const updateFields = ['status = ?'];
    const updateValues = [status];

    // Set shipped_date if status is shipped
    if (status === 'shipped') {
      updateFields.push('shipped_date = CURRENT_TIMESTAMP');
    }

    updateValues.push(id);

    await pool.execute(
      `UPDATE orders SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Get updated order
    const [orders] = await pool.execute(
      `SELECT o.*, 
              c.company_name, c.contact_person, c.email as customer_email
       FROM orders o 
       LEFT JOIN customers c ON o.customer_id = c.id 
       WHERE o.id = ?`,
      [id]
    );

    const order = orders[0];
    order.shipping_address = order.shipping_address ? JSON.parse(order.shipping_address) : null;
    order.billing_address = order.billing_address ? JSON.parse(order.billing_address) : null;

    res.status(200).json({
      success: true,
      data: order
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus
};
