const mysql = require('mysql2/promise');
require('dotenv').config();

const API_URL = 'https://api.shinningpaint.startechaigroup.com/api/careers';

// Manually connecting to DB to check result since we need to verify DB state
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME || ' Shinningpaint_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testPostCareer() {
    try {
        console.log('Testing Create Career with Dates...');

        const newCareer = {
            title: "Test Date Posting",
            department: "Engineering",
            location: "Test City",
            type: "full-time",
            description: "Testing date persistence",
            requirements: "None",
            application_start_date: "2025-01-01",
            application_deadline: "2025-01-31",
            is_active: true
        };

        // We assume we don't need auth token for this test or we mock it?
        // Wait, the route is protected. I need a token?
        // The file says // @access Private (Admin/Manager)

        // I'll skip the API call for a second and just run the SQL INSERT directly to see if the DB accepts it
        // This isolates whether it's an API/params issue or a DB schema issue.

        console.log('Direct DB Insert Test:');
        const [result] = await pool.execute(
            'INSERT INTO careers (title, department, location, type, description, requirements, application_start_date, application_deadline, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                newCareer.title,
                newCareer.department,
                newCareer.location,
                newCareer.type,
                newCareer.description,
                newCareer.requirements,
                newCareer.application_start_date,
                newCareer.application_deadline,
                newCareer.is_active
            ]
        );

        console.log('Insert ID:', result.insertId);

        const [rows] = await pool.execute('SELECT title, application_start_date, application_deadline FROM careers WHERE id = ?', [result.insertId]);
        console.log('Retrieved Row:', JSON.stringify(rows[0], null, 2));

        if (rows[0].application_start_date && rows[0].application_deadline) {
            console.log('✅ Dates saved successfully in DB directly');
        } else {
            console.log('❌ Dates NOT saved correctly in DB');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

testPostCareer();
