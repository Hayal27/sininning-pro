const { pool } = require('../config/database');

// @desc    Get all products
// @route   GET /api/products
// @access  Private
const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const status = req.query.status || '';
    const lowStock = req.query.lowStock === 'true';

    // Build WHERE clause
    let whereClause = 'WHERE 1=1';
    const queryParams = [];

    if (search) {
      whereClause += ' AND (p.name LIKE ? OR p.sku LIKE ? OR p.description LIKE ?)';
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (category) {
      whereClause += ' AND p.category_id = ?';
      queryParams.push(category);
    }

    if (status) {
      const isActive = status === 'active';
      whereClause += ' AND p.is_active = ?';
      queryParams.push(isActive);
    }

    if (lowStock) {
      whereClause += ' AND p.stock_quantity <= p.min_stock_level';
    }

    if (req.query.featured === 'true') {
      whereClause += ' AND p.is_featured = 1';
    }

    // Get total count
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM products p ${whereClause}`,
      queryParams
    );
    const total = countResult[0].total;

    // Get products with category information
    const [products] = await pool.execute(
      `SELECT p.*, pc.name as category_name 
       FROM products p 
       LEFT JOIN product_categories pc ON p.category_id = pc.id 
       ${whereClause} 
       ORDER BY p.created_at DESC 
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    // Parse JSON fields
    const formattedProducts = products.map(product => ({
      ...product,
      images: product.images ? JSON.parse(product.images) : [],
      specifications: product.specifications ? JSON.parse(product.specifications) : {}
    }));

    res.status(200).json({
      success: true,
      data: formattedProducts,
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

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [products] = await pool.execute(
      `SELECT p.*, pc.name as category_name 
       FROM products p 
       LEFT JOIN product_categories pc ON p.category_id = pc.id 
       WHERE p.id = ?`,
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    const product = products[0];

    // Parse JSON fields
    product.images = product.images ? JSON.parse(product.images) : [];
    product.specifications = product.specifications ? JSON.parse(product.specifications) : {};

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private (Admin/Manager)
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      sku,
      category_id,
      price,
      cost_price,
      stock_quantity = 0,
      min_stock_level = 10,
      max_stock_level = 1000,
      unit = 'liters',
      color_code,
      finish_type,
      coverage_area,
      drying_time,
      images = [],
      specifications = {},
      is_featured = false
    } = req.body;

    // Check if SKU already exists
    const [existingProducts] = await pool.execute(
      'SELECT id FROM products WHERE sku = ?',
      [sku]
    );

    if (existingProducts.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Product with this SKU already exists'
      });
    }

    // Validate category if provided
    if (category_id) {
      const [categories] = await pool.execute(
        'SELECT id FROM product_categories WHERE id = ? AND is_active = true',
        [category_id]
      );

      if (categories.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Invalid category ID'
        });
      }
    }

    // Create product
    const [result] = await pool.execute(
      `INSERT INTO products (
        name, description, sku, category_id, price, cost_price, 
        stock_quantity, min_stock_level, max_stock_level, unit,
        color_code, finish_type, coverage_area, drying_time,
        images, specifications, is_featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description,
        sku,
        category_id || null,
        price,
        cost_price || null,
        stock_quantity,
        min_stock_level,
        max_stock_level,
        unit,
        color_code || null,
        finish_type || null,
        coverage_area || null,
        drying_time || null,
        JSON.stringify(images),
        JSON.stringify(specifications),
        is_featured
      ]
    );

    // Create initial inventory transaction
    if (stock_quantity > 0) {
      await pool.execute(
        `INSERT INTO inventory_transactions (
          product_id, transaction_type, quantity, reference_type, notes, user_id
        ) VALUES (?, 'in', ?, 'adjustment', 'Initial stock', ?)`,
        [result.insertId, stock_quantity, req.user.id]
      );
    }

    // Get created product
    const [products] = await pool.execute(
      `SELECT p.*, pc.name as category_name 
       FROM products p 
       LEFT JOIN product_categories pc ON p.category_id = pc.id 
       WHERE p.id = ?`,
      [result.insertId]
    );

    const product = products[0];
    product.images = JSON.parse(product.images);
    product.specifications = JSON.parse(product.specifications);

    res.status(201).json({
      success: true,
      data: product
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin/Manager)
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if product exists
    const [existingProducts] = await pool.execute(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (existingProducts.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    const currentProduct = existingProducts[0];

    // Check if SKU is being changed and if it already exists
    if (updateData.sku && updateData.sku !== currentProduct.sku) {
      const [skuCheck] = await pool.execute(
        'SELECT id FROM products WHERE sku = ? AND id != ?',
        [updateData.sku, id]
      );

      if (skuCheck.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'SKU is already taken by another product'
        });
      }
    }

    // Build update query
    const updateFields = [];
    const updateValues = [];

    const allowedFields = [
      'name', 'description', 'sku', 'category_id', 'price', 'cost_price',
      'min_stock_level', 'max_stock_level', 'unit', 'color_code',
      'finish_type', 'coverage_area', 'drying_time', 'is_active', 'is_featured'
    ];

    allowedFields.forEach(field => {
      if (updateData[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        updateValues.push(updateData[field]);
      }
    });

    // Handle JSON fields
    if (updateData.images !== undefined) {
      updateFields.push('images = ?');
      updateValues.push(JSON.stringify(updateData.images));
    }

    if (updateData.specifications !== undefined) {
      updateFields.push('specifications = ?');
      updateValues.push(JSON.stringify(updateData.specifications));
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No fields to update'
      });
    }

    updateValues.push(id);

    // Update product
    await pool.execute(
      `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Get updated product
    const [products] = await pool.execute(
      `SELECT p.*, pc.name as category_name 
       FROM products p 
       LEFT JOIN product_categories pc ON p.category_id = pc.id 
       WHERE p.id = ?`,
      [id]
    );

    const product = products[0];
    product.images = product.images ? JSON.parse(product.images) : [];
    product.specifications = product.specifications ? JSON.parse(product.specifications) : {};

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const [existingProducts] = await pool.execute(
      'SELECT id FROM products WHERE id = ?',
      [id]
    );

    if (existingProducts.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Soft delete - deactivate product instead of hard delete
    await pool.execute(
      'UPDATE products SET is_active = false WHERE id = ?',
      [id]
    );

    res.status(200).json({
      success: true,
      message: 'Product deactivated successfully'
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
