const { pool } = require('./src/config/database');

async function addCareerDateFields() {
    try {
        console.log('Adding application date fields to careers table...');

        // Add application_start_date column
        await pool.execute(`
            ALTER TABLE careers 
            ADD COLUMN IF NOT EXISTS application_start_date DATE AFTER requirements
        `);

        // Add application_deadline column
        await pool.execute(`
            ALTER TABLE careers 
            ADD COLUMN IF NOT EXISTS application_deadline DATE AFTER application_start_date
        `);

        console.log('✅ Successfully added application_start_date and application_deadline columns');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error adding columns:', error.message);
        process.exit(1);
    }
}

addCareerDateFields();
