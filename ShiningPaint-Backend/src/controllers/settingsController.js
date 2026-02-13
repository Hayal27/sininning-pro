const { pool } = require('../config/database');

// @desc    Get all settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT `key`, `value`, `group` FROM settings');

        // Convert to a more usable format: { key: value }
        const settings = {};
        rows.forEach(row => {
            settings[row.key] = row.value;
        });

        res.json({
            success: true,
            data: settings
        });
    } catch (error) {
        console.error('Get settings error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch settings'
        });
    }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
    try {
        const updates = req.body; // Expecting { key: value, ... }

        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            for (const [key, value] of Object.entries(updates)) {
                await connection.execute(
                    'UPDATE settings SET `value` = ? WHERE `key` = ?',
                    [value, key]
                );
            }

            await connection.commit();
            connection.release();

            res.json({
                success: true,
                message: 'Settings updated successfully'
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error('Update settings error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update settings'
        });
    }
};

module.exports = {
    getSettings,
    updateSettings
};
