const { pool } = require('./database');

const migrateHero = async () => {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('🔌 Database connected');

        // Create hero_sections table
        await connection.query(`
      CREATE TABLE IF NOT EXISTS hero_sections (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle TEXT,
        images JSON,
        cta_primary_text VARCHAR(100),
        cta_primary_link VARCHAR(255),
        cta_secondary_text VARCHAR(100),
        cta_secondary_link VARCHAR(255),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
        console.log('✅ hero_sections table created or already exists');

        // Check if any data exists
        const [rows] = await connection.query('SELECT COUNT(*) as count FROM hero_sections');

        if (rows[0].count === 0) {
            // Insert default data based on existing code
            const defaultHero = {
                title: 'We Paint quality on the road',
                subtitle: 'Leading manufacturer of premium road marking paints, dedicated to enhancing road safety and infrastructure durability.',
                images: JSON.stringify([
                    '/images/hero/1.jpg',
                    '/images/hero/2.jpg',
                    '/images/hero/3.jpg',
                    '/images/hero/4.jpg',
                    '/images/hero/5.jpg',
                    '/images/hero/6.jpg',
                    '/images/hero/7.jpg',
                ]),
                cta_primary_text: 'Explore Products',
                cta_primary_link: '/products',
                cta_secondary_text: 'Get Quote',
                cta_secondary_link: '/contact',
                is_active: true
            };

            await connection.query(
                `INSERT INTO hero_sections 
        (title, subtitle, images, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, is_active) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    defaultHero.title,
                    defaultHero.subtitle,
                    defaultHero.images,
                    defaultHero.cta_primary_text,
                    defaultHero.cta_primary_link,
                    defaultHero.cta_secondary_text,
                    defaultHero.cta_secondary_link,
                    defaultHero.is_active
                ]
            );
            console.log('✅ Default hero data inserted');
        } else {
            console.log('ℹ️ Hero data already exists, skipping insertion');
        }

    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
};

migrateHero();
