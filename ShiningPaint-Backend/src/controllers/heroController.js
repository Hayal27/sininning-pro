const { pool } = require('../config/database');

exports.getHeroSection = async (req, res, next) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM hero_sections WHERE is_active = TRUE LIMIT 1'
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No active hero section found'
            });
        }

        const hero = rows[0];

        // Parse images if stored as JSON string (mysql2 usually handles JSON columns but just to be safe if it comes back as string)
        // Actually mysql2 with JSON column type returns object/array automatically usually, but let's be safe.
        // If the column type is JSON, it returns object. If text, string.
        // In migration I used JSON type.

        res.status(200).json({
            success: true,
            data: hero
        });
    } catch (error) {
        next(error);
    }
};

exports.updateHeroSection = async (req, res, next) => {
    try {
        const { title, subtitle, images, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, is_active } = req.body;
        const { id } = req.params;

        // Build update query dynamically
        // For simplicity, let's just update specific fields or all

        await pool.query(
            `UPDATE hero_sections SET 
        title = ?, 
        subtitle = ?, 
        images = ?, 
        cta_primary_text = ?, 
        cta_primary_link = ?, 
        cta_secondary_text = ?, 
        cta_secondary_link = ?, 
        is_active = ?
       WHERE id = ?`,
            [
                title,
                subtitle,
                JSON.stringify(images),
                cta_primary_text,
                cta_primary_link,
                cta_secondary_text,
                cta_secondary_link,
                is_active,
                id
            ]
        );

        res.status(200).json({
            success: true,
            message: 'Hero section updated successfully'
        });

    } catch (error) {
        next(error);
    }
};
