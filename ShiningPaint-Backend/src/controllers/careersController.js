const { pool } = require('../config/database');
const sendEmail = require('../utils/sendEmail');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

// @desc    Apply for a job
// @route   POST /api/careers/apply
// @access  Public
const applyForJob = async (req, res) => {
    try {
        console.log('applyForJob req.body:', req.body);
        console.log('applyForJob req.files:', req.files ? Object.keys(req.files) : 'No files');
        const { name, email, phone, jobId, coverLetter, jobTitle } = req.body;

        if (!req.files || !req.files.cv) {
            return res.status(400).json({ success: false, message: 'Please upload your CV' });
        }

        const cvFile = req.files.cv;

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(cvFile.mimetype)) {
            return res.status(400).json({ success: false, message: 'Please upload a PDF or Word document' });
        }

        // Save file
        const fileExtension = path.extname(cvFile.name);
        const fileName = `cv_${uuidv4()}${fileExtension}`;
        const uploadPath = path.join(__dirname, '../../uploads/cvs');

        try {
            await fs.access(uploadPath);
        } catch {
            await fs.mkdir(uploadPath, { recursive: true });
        }

        const filePath = path.join(uploadPath, fileName);
        await cvFile.mv(filePath);

        // Send Email
        const message = `
      New Job Application for: ${jobTitle}
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      
      Cover Letter:
      ${coverLetter}
    `;

        // Insert into database
        await pool.execute(
            'INSERT INTO job_applications (career_id, job_title, name, email, phone, cover_letter, cv_path) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [jobId, jobTitle, name, email, phone, coverLetter, fileName]
        );

        console.log('Application saved to database');

        // Send Email
        console.log('Attempting to send email to:', process.env.HR_EMAIL || process.env.EMAIL_USER);
        console.log('Email config check - USER:', process.env.EMAIL_USER);
        console.log('Email config check - PASS exists:', !!process.env.EMAIL_PASS);
        console.log('Email config check - SMTP_HOST:', process.env.SMTP_HOST);
        console.log('Email config check - SMTP_PORT:', process.env.SMTP_PORT);

        await sendEmail({
            email: process.env.HR_EMAIL || process.env.EMAIL_USER,
            subject: `Job Application: ${jobTitle} - ${name}`,
            message: message,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2563EB;">New Job Application</h2>
          <p><strong>Job Title:</strong> ${jobTitle} (ID: ${jobId})</p>
          <hr>
          <h3>Applicant Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <br>
          <h3>Cover Letter</h3>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px;">
            <p>${coverLetter ? coverLetter.replace(/\n/g, '<br>') : 'No cover letter provided.'}</p>
          </div>
          <br>
          <p><em>The CV is attached to this email.</em></p>
        </div>
      `,
            attachments: [
                {
                    filename: cvFile.name,
                    path: filePath
                }
            ]
        });

        res.status(200).json({ success: true, message: 'Application submitted successfully' });

    } catch (error) {
        console.error('Application error details:', error);
        console.error('Error stack:', error.stack);
        console.error('Error name:', error.name);
        console.error('Error code:', error.code);
        res.status(500).json({ success: false, message: error.message || 'Server Error' });
    }
};

// @desc    Get all careers (Active only) with filters and pagination
// @route   GET /api/careers
// @access  Public
// @desc    Get all careers (Active only) with filters and pagination
// @route   GET /api/careers
// @access  Public
const getAllCareers = async (req, res) => {
    try {
        const { search, department, type, location, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        let query = 'SELECT * FROM careers WHERE is_active = true';
        const params = [];

        if (search) {
            query += ' AND (title LIKE ? OR description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        if (department && department !== 'All Departments') {
            query += ' AND department LIKE ?';
            params.push(department);
        }

        if (type && type !== 'All Types') {
            query += ' AND type = ?';
            params.push(type);
        }

        if (location && location !== 'All Locations') {
            query += ' AND location LIKE ?';
            params.push(location);
        }

        // Get total count for pagination
        const [countResult] = await pool.execute(
            query.replace('SELECT *', 'SELECT COUNT(*) as total'),
            params
        );
        const total = countResult[0].total;

        // Add sorting and pagination
        query += ' ORDER BY posted_at DESC LIMIT ? OFFSET ?';
        params.push(limit.toString(), offset.toString());

        const [careers] = await pool.execute(query, params);

        res.status(200).json({
            success: true,
            data: careers,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get all careers (Admin)
// @route   GET /api/careers/admin
// @access  Private (Admin/Manager)
const getAllCareersAdmin = async (req, res) => {
    try {
        const [careers] = await pool.execute('SELECT * FROM careers ORDER BY created_at DESC');
        res.status(200).json({ success: true, data: careers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get all job applications (Admin)
// @route   GET /api/careers/applications
// @access  Private (Admin/Manager)
const getApplications = async (req, res) => {
    try {
        const [applications] = await pool.execute('SELECT * FROM job_applications ORDER BY applied_at DESC');
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single career
// @route   GET /api/careers/:id
// @access  Public
const getCareerById = async (req, res) => {
    try {
        const [career] = await pool.execute('SELECT * FROM careers WHERE id = ?', [req.params.id]);
        if (career.length === 0) {
            return res.status(404).json({ success: false, message: 'Job posting not found' });
        }
        res.status(200).json({ success: true, data: career[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create career
// @route   POST /api/careers
// @access  Private (Admin/Manager)
const createCareer = async (req, res) => {
    try {
        console.log('Creating career with body:', req.body);
        const { title, department, location, type, description, requirements, application_start_date, application_deadline, is_active } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, message: 'Please provide title and description' });
        }

        // Handle empty strings for dates by converting to null
        const startDate = (application_start_date !== null && application_start_date !== undefined && application_start_date.trim() !== '') ? application_start_date : null;
        const deadline = (application_deadline !== null && application_deadline !== undefined && application_deadline.trim() !== '') ? application_deadline : null;

        const [result] = await pool.execute(
            'INSERT INTO careers (title, department, location, type, description, requirements, application_start_date, application_deadline, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                title,
                department || 'General',
                location || 'Addis Ababa',
                type || 'full-time',
                description,
                requirements || '',
                startDate,
                deadline,
                is_active === undefined ? true : is_active
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Job posting created successfully',
            data: {
                id: result.insertId,
                ...req.body,
                application_start_date: startDate,
                application_deadline: deadline
            }
        });
    } catch (error) {
        console.error('Error creating career:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update career
// @route   PUT /api/careers/:id
// @access  Private (Admin/Manager)
const updateCareer = async (req, res) => {
    try {
        console.log(`Updating career ${req.params.id} with body:`, req.body);
        const { title, department, location, type, description, requirements, application_start_date, application_deadline, is_active } = req.body;

        const [career] = await pool.execute('SELECT * FROM careers WHERE id = ?', [req.params.id]);
        if (career.length === 0) {
            return res.status(404).json({ success: false, message: 'Job posting not found' });
        }

        // For updates, if a field is undefined, we keep the old one. If it's a string (even empty), we process it.
        // But for dates, empty string means NULL.

        let startDate = career[0].application_start_date;
        if (application_start_date !== undefined) {
            startDate = (application_start_date !== null && application_start_date.trim() !== '') ? application_start_date : null;
        }

        let deadline = career[0].application_deadline;
        if (application_deadline !== undefined) {
            deadline = (application_deadline !== null && application_deadline.trim() !== '') ? application_deadline : null;
        }

        await pool.execute(
            'UPDATE careers SET title = ?, department = ?, location = ?, type = ?, description = ?, requirements = ?, application_start_date = ?, application_deadline = ?, is_active = ? WHERE id = ?',
            [
                title || career[0].title,
                department || career[0].department,
                location || career[0].location,
                type || career[0].type,
                description || career[0].description,
                requirements !== undefined ? requirements : career[0].requirements,
                startDate,
                deadline,
                is_active !== undefined ? is_active : career[0].is_active,
                req.params.id
            ]
        );

        res.status(200).json({ success: true, message: 'Job posting updated successfully' });
    } catch (error) {
        console.error('Error updating career:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete career
// @route   DELETE /api/careers/:id
// @access  Private (Admin/Manager)
const deleteCareer = async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM careers WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Job posting not found' });
        }
        res.status(200).json({ success: true, message: 'Job posting deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    getAllCareers,
    getAllCareersAdmin,
    getCareerById,
    createCareer,
    updateCareer,
    deleteCareer,
    applyForJob,
    getApplications
};
