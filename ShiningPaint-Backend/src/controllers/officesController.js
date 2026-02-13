const { pool } = require('../config/database');

// @desc    Get all offices
// @route   GET /api/offices
// @access  Public
const getOffices = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM offices ORDER BY is_primary DESC, order_index ASC');
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Get offices error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch offices'
        });
    }
};

// @desc    Add new office
// @route   POST /api/offices
// @access  Private/Admin
const createOffice = async (req, res) => {
    try {
        const { name, address, phone, email, hours_mon_fri, hours_sat, hours_sun, is_primary } = req.body;

        // If setting as primary, unset others
        if (is_primary) {
            await pool.execute('UPDATE offices SET is_primary = FALSE');
        }

        const [result] = await pool.execute(
            `INSERT INTO offices (name, address, phone, email, hours_mon_fri, hours_sat, hours_sun, is_primary) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, address, phone, email, hours_mon_fri, hours_sat, hours_sun, is_primary || false]
        );

        res.status(201).json({
            success: true,
            data: { id: result.insertId, ...req.body }
        });
    } catch (error) {
        console.error('Create office error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create office'
        });
    }
};

// @desc    Update office
// @route   PUT /api/offices/:id
// @access  Private/Admin
const updateOffice = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone, email, hours_mon_fri, hours_sat, hours_sun, is_primary } = req.body;

        if (is_primary) {
            await pool.execute('UPDATE offices SET is_primary = FALSE WHERE id != ?', [id]);
        }

        await pool.execute(
            `UPDATE offices SET 
        name = ?, address = ?, phone = ?, email = ?, 
        hours_mon_fri = ?, hours_sat = ?, hours_sun = ?, is_primary = ? 
       WHERE id = ?`,
            [name, address, phone, email, hours_mon_fri, hours_sat, hours_sun, is_primary, id]
        );

        res.json({
            success: true,
            message: 'Office updated successfully'
        });
    } catch (error) {
        console.error('Update office error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update office'
        });
    }
};

// @desc    Delete office
// @route   DELETE /api/offices/:id
// @access  Private/Admin
const deleteOffice = async (req, res) => {
    try {
        const { id } = req.params;

        // Don't allow deleting the last office or primary if others exist? 
        // Simplified for now.
        await pool.execute('DELETE FROM offices WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Office deleted successfully'
        });
    } catch (error) {
        console.error('Delete office error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete office'
        });
    }
};

module.exports = {
    getOffices,
    createOffice,
    updateOffice,
    deleteOffice
};
