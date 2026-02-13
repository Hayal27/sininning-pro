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

async function checkColumns() {
    try {
        const [rows] = await pool.execute(`SHOW COLUMNS FROM careers`);
        console.log('Columns in careers table:');
        rows.forEach(row => {
            console.log(`- ${row.Field} (${row.Type})`);
        });

        console.log('\nChecking distinct departments:');
        const [depts] = await pool.execute('SELECT DISTINCT department FROM careers');
        console.log(JSON.stringify(depts, null, 2));

        console.log('\nChecking first 2 rows data:');
        const [data] = await pool.execute('SELECT id, title, department, application_start_date, application_deadline FROM careers LIMIT 5');
        console.log(JSON.stringify(data, null, 2));

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkColumns();
