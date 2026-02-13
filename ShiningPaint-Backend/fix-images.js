const { pool } = require('./src/config/database');

const fixHeroImages = async () => {
    try {
        const [rows] = await pool.query('SELECT id, images FROM hero_sections WHERE id = 1');
        if (rows.length > 0) {
            let images = JSON.parse(rows[0].images);
            // Filter out 7.jpg if it's there
            const updatedImages = images.filter(img => !img.includes('7.jpg'));

            await pool.query('UPDATE hero_sections SET images = ? WHERE id = ?', [JSON.stringify(updatedImages), rows[0].id]);
            console.log('✅ Hero images list updated in DB');
        }
    } catch (error) {
        console.error('❌ Failed to fix hero images:', error);
    } finally {
        process.exit();
    }
};

fixHeroImages();
