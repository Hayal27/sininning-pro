const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || ' Shinningpaint_db',
};

async function migrateFeaturedColumn() {
    let connection;

    try {
        console.log('🔄 Starting migration: Adding is_featured column to products table...\n');

        // Create connection
        connection = await mysql.createConnection(dbConfig);
        console.log('✅ Database connection established');

        // Check if column already exists
        const [columns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? 
        AND TABLE_NAME = 'products' 
        AND COLUMN_NAME = 'is_featured'
    `, [dbConfig.database]);

        if (columns.length > 0) {
            console.log('ℹ️  Column "is_featured" already exists. No migration needed.');
            return;
        }

        // Add the is_featured column
        await connection.execute(`
      ALTER TABLE products 
      ADD COLUMN is_featured TINYINT(1) DEFAULT 0 
      AFTER is_active
    `);

        console.log('✅ Successfully added "is_featured" column to products table');

        // Verify the column was added
        const [verify] = await connection.execute(`
      SELECT COLUMN_NAME, COLUMN_TYPE, COLUMN_DEFAULT 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? 
        AND TABLE_NAME = 'products' 
        AND COLUMN_NAME = 'is_featured'
    `, [dbConfig.database]);

        if (verify.length > 0) {
            console.log('\n📊 Column details:');
            console.log('   Name:', verify[0].COLUMN_NAME);
            console.log('   Type:', verify[0].COLUMN_TYPE);
            console.log('   Default:', verify[0].COLUMN_DEFAULT);
        }

        // Get current product count
        const [countResult] = await connection.execute('SELECT COUNT(*) as total FROM products');
        const productCount = countResult[0].total;

        console.log(`\n📦 Total products in database: ${productCount}`);
        console.log('   All products have is_featured = 0 by default');
        console.log('\n💡 Next steps:');
        console.log('   1. Go to Admin Dashboard → Products page');
        console.log('   2. Click the star icon (⭐) to mark products as featured');
        console.log('   3. Featured products will appear on the homepage\n');

        console.log('✅ Migration completed successfully!\n');

    } catch (error) {
        console.error('\n❌ Migration failed:', error.message);
        console.error('Error details:', error);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('🔌 Database connection closed');
        }
    }
}

// Run migration
migrateFeaturedColumn()
    .then(() => {
        console.log('\n✨ All done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Unexpected error:', error);
        process.exit(1);
    });
