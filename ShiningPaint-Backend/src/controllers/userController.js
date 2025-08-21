const { pool } = require('../config/database');
const { hashPassword, generateRandomPassword } = require('../utils/password');

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin/Manager)
const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const status = req.query.status || '';

    // Build WHERE clause
    let whereClause = 'WHERE 1=1';
    const queryParams = [];

    if (search) {
      whereClause += ' AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)';
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (role) {
      whereClause += ' AND role = ?';
      queryParams.push(role);
    }

    if (status) {
      const isActive = status === 'active';
      whereClause += ' AND is_active = ?';
      queryParams.push(isActive);
    }

    // Get total count
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM users ${whereClause}`,
      queryParams
    );
    const total = countResult[0].total;

    // Get users
    const [users] = await pool.execute(
      `SELECT id, email, first_name, last_name, role, phone, avatar, is_active, last_login, created_at 
       FROM users ${whereClause} 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    res.status(200).json({
      success: true,
      data: users,
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

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (Admin/Manager)
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [users] = await pool.execute(
      'SELECT id, email, first_name, last_name, role, phone, avatar, is_active, last_login, created_at FROM users WHERE id = ?',
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: users[0]
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Create user
// @route   POST /api/users
// @access  Private (Admin)
const createUser = async (req, res, next) => {
  try {
    const { email, first_name, last_name, role = 'employee', phone } = req.body;

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists'
      });
    }

    // Generate random password
    const tempPassword = generateRandomPassword();
    const hashedPassword = await hashPassword(tempPassword);

    // Create user
    const [result] = await pool.execute(
      `INSERT INTO users (email, password, first_name, last_name, role, phone) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [email, hashedPassword, first_name, last_name, role, phone]
    );

    // Get created user
    const [users] = await pool.execute(
      'SELECT id, email, first_name, last_name, role, phone, is_active, created_at FROM users WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      data: users[0],
      message: 'User created successfully',
      tempPassword: tempPassword // In production, send this via email
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin/Manager)
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name, role, phone, is_active } = req.body;

    // Check if user exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE id = ?',
      [id]
    );

    if (existingUsers.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if email is already taken by another user
    if (email) {
      const [emailCheck] = await pool.execute(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email, id]
      );

      if (emailCheck.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Email is already taken by another user'
        });
      }
    }

    // Build update query
    const updateFields = [];
    const updateValues = [];

    if (email !== undefined) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (first_name !== undefined) {
      updateFields.push('first_name = ?');
      updateValues.push(first_name);
    }
    if (last_name !== undefined) {
      updateFields.push('last_name = ?');
      updateValues.push(last_name);
    }
    if (role !== undefined) {
      updateFields.push('role = ?');
      updateValues.push(role);
    }
    if (phone !== undefined) {
      updateFields.push('phone = ?');
      updateValues.push(phone);
    }
    if (is_active !== undefined) {
      updateFields.push('is_active = ?');
      updateValues.push(is_active);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No fields to update'
      });
    }

    updateValues.push(id);

    // Update user
    await pool.execute(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Get updated user
    const [users] = await pool.execute(
      'SELECT id, email, first_name, last_name, role, phone, avatar, is_active, last_login, created_at FROM users WHERE id = ?',
      [id]
    );

    res.status(200).json({
      success: true,
      data: users[0]
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin)
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE id = ?',
      [id]
    );

    if (existingUsers.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Prevent self-deletion
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({
        success: false,
        error: 'You cannot delete your own account'
      });
    }

    // Soft delete - deactivate user instead of hard delete
    await pool.execute(
      'UPDATE users SET is_active = false WHERE id = ?',
      [id]
    );

    res.status(200).json({
      success: true,
      message: 'User deactivated successfully'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Reset user password
// @route   POST /api/users/:id/reset-password
// @access  Private (Admin)
const resetPassword = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const [existingUsers] = await pool.execute(
      'SELECT id, email FROM users WHERE id = ?',
      [id]
    );

    if (existingUsers.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Generate new password
    const newPassword = generateRandomPassword();
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
      newPassword: newPassword // In production, send this via email
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  resetPassword
};
