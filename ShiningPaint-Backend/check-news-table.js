require('dotenv').config();
const { pool } = require('./src/config/database');

async function checkNewsTable() {
    try {
        console.log('🔍 Checking news table structure...\n');

        const connection = await pool.getConnection();

        // Get table structure
        const [columns] = await connection.execute('SHOW COLUMNS FROM news');

        console.log('📋 News table columns:');
        columns.forEach(col => {
            console.log(`   - ${col.Field} (${col.Type}) ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${col.Default ? `DEFAULT ${col.Default}` : ''}`);
        });

        // Get sample data
        const [news] = await connection.execute('SELECT * FROM news LIMIT 1');
        console.log(`\n📊 Sample data: ${news.length} row(s)`);
        if (news.length > 0) {
            console.log('   First row:', JSON.stringify(news[0], null, 2));
        }

        connection.release();

        console.log('\n✅ Table check complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

checkNewsTable();
