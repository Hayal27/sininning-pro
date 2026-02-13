const { pool } = require('./database');

const migrate = async () => {
    try {
        const connection = await pool.getConnection();

        console.log('Connected to database...');

        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS job_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        career_id INT,
        job_title VARCHAR(255),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        cover_letter TEXT,
        cv_path VARCHAR(255),
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE SET NULL
      );
    `;

        await connection.query(createTableQuery);

        console.log('job_applications table created or already exists.');

        connection.release();
        process.exit();
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrate();
