require('dotenv').config();
const { pool } = require('./src/config/database');

async function checkNewsPublishStatus() {
    try {
        console.log('🔍 Checking news publish status...\n');

        const connection = await pool.getConnection();

        // Get all news
        const [news] = await connection.execute('SELECT id, title, is_published FROM news ORDER BY id DESC LIMIT 5');

        console.log('📰 Latest 5 news articles:');
        news.forEach(item => {
            console.log(`   ID: ${item.id} | Published: ${item.is_published} (${typeof item.is_published}) | Title: ${item.title}`);
        });

        connection.release();

        console.log('\n✅ Check complete!');
        console.log('\n💡 Note: is_published should be 1 (true) or 0 (false)');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

checkNewsPublishStatus();
