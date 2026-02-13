const mysql = require('mysql2/promise');
require('dotenv').config();

async function verifyDates() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || ' Shinningpaint_db'
    });

    console.log('=== CURRENT CAREERS TABLE DATA ===\n');

    const [rows] = await connection.execute(
        'SELECT id, title, department, application_start_date, application_deadline FROM careers ORDER BY id DESC LIMIT 10'
    );

    rows.forEach(row => {
        console.log(`ID: ${row.id}`);
        console.log(`Title: ${row.title}`);
        console.log(`Department: ${row.department}`);
        console.log(`Start Date: ${row.application_start_date}`);
        console.log(`Deadline: ${row.application_deadline}`);
        console.log('---');
    });

    await connection.end();
}

verifyDates().catch(console.error);
