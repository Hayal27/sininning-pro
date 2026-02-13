const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME || ' Shinningpaint_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function fixData() {
    try {
        console.log('Updating sample data...');

        // Update ID 1: Engineering
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setDate(today.getDate() + 30);

        await pool.execute(`
            UPDATE careers 
            SET department = 'Engineering', 
                location = 'Addis Ababa',
                application_start_date = CURRENT_DATE(), 
                application_deadline = DATE_ADD(CURRENT_DATE(), INTERVAL 30 DAY)
            WHERE id = 1
        `);
        console.log('Updated ID 1 to Engineering');

        // Update ID 2: Sales
        await pool.execute(`
            UPDATE careers 
            SET department = 'Sales', 
                location = 'Remote',
                application_start_date = DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY), 
                application_deadline = DATE_ADD(CURRENT_DATE(), INTERVAL 14 DAY)
            WHERE id = 2
        `);
        console.log('Updated ID 2 to Sales');

        // Verify
        const [rows] = await pool.execute('SELECT id, title, department, application_start_date, application_deadline FROM careers LIMIT 5');
        console.log('Current Data:', JSON.stringify(rows, null, 2));

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

fixData();
