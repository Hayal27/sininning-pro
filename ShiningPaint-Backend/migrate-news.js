require('dotenv').config();
const { pool } = require('./src/config/database');

async function migrateNewsTable() {
    try {
        console.log('🔄 Starting news table migration...');

        const connection = await pool.getConnection();

        // Check if columns exist before adding them
        const [columns] = await connection.execute(`
            SHOW COLUMNS FROM news
        `);

        const columnNames = columns.map(col => col.Field);

        // Add summary column if it doesn't exist
        if (!columnNames.includes('summary')) {
            console.log('Adding summary column...');
            await connection.execute(`
                ALTER TABLE news ADD COLUMN summary TEXT AFTER title
            `);
        }

        // Add images column if it doesn't exist (and remove old image column)
        if (!columnNames.includes('images')) {
            console.log('Adding images column...');
            await connection.execute(`
                ALTER TABLE news ADD COLUMN images JSON AFTER content
            `);

            // Migrate old image data to images array
            if (columnNames.includes('image')) {
                console.log('Migrating old image data...');
                await connection.execute(`
                    UPDATE news 
                    SET images = JSON_ARRAY(image) 
                    WHERE image IS NOT NULL AND image != ''
                `);

                console.log('Dropping old image column...');
                await connection.execute(`
                    ALTER TABLE news DROP COLUMN image
                `);
            }
        }

        // Add category column if it doesn't exist
        if (!columnNames.includes('category')) {
            console.log('Adding category column...');
            await connection.execute(`
                ALTER TABLE news ADD COLUMN category VARCHAR(100) DEFAULT 'general' AFTER images
            `);
        }

        // Add indexes if they don't exist
        const [indexes] = await connection.execute(`
            SHOW INDEX FROM news WHERE Key_name = 'idx_category'
        `);

        if (indexes.length === 0) {
            console.log('Adding category index...');
            await connection.execute(`
                ALTER TABLE news ADD INDEX idx_category (category)
            `);
        }

        const [publishedIndexes] = await connection.execute(`
            SHOW INDEX FROM news WHERE Key_name = 'idx_published'
        `);

        if (publishedIndexes.length === 0) {
            console.log('Adding published index...');
            await connection.execute(`
                ALTER TABLE news ADD INDEX idx_published (is_published)
            `);
        }

        connection.release();

        console.log('✅ News table migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrateNewsTable();
