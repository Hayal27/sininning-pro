const { pool } = require('../config/database');

/**
 * Submit contact form
 */
exports.submitContactForm = async (req, res) => {
    try {
        const {
            name,
            email,
            company,
            phone,
            subject,
            message,
            inquiry_type = 'general'
        } = req.body;

        // Get IP address and user agent
        const ip_address = req.ip || req.connection.remoteAddress;
        const user_agent = req.get('user-agent');

        // Insert contact submission
        const [result] = await pool.execute(
            `INSERT INTO contact_submissions (
        name, email, company, phone, subject, message, 
        inquiry_type, ip_address, user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                email,
                company || null,
                phone || null,
                subject,
                message,
                inquiry_type,
                ip_address,
                user_agent
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Thank you for contacting us! We will get back to you soon.',
            ticket_id: `TICKET-${result.insertId}`
        });
    } catch (error) {
        console.error('Submit contact form error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to submit contact form'
        });
    }
};

/**
 * Get all contact submissions (Admin only)
 */
exports.getContactSubmissions = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            status,
            inquiry_type,
            search
        } = req.query;

        const offset = (page - 1) * limit;
        let query = `
      SELECT 
        cs.*,
        u.first_name as assigned_first_name,
        u.last_name as assigned_last_name
      FROM contact_submissions cs
      LEFT JOIN users u ON cs.assigned_to = u.id
      WHERE 1=1
    `;
        const params = [];

        // Filter by status
        if (status) {
            query += ' AND cs.status = ?';
            params.push(status);
        }

        // Filter by inquiry type
        if (inquiry_type) {
            query += ' AND cs.inquiry_type = ?';
            params.push(inquiry_type);
        }

        // Search by name, email, or subject
        if (search) {
            query += ' AND (cs.name LIKE ? OR cs.email LIKE ? OR cs.subject LIKE ?)';
            const searchPattern = `%${search}%`;
            params.push(searchPattern, searchPattern, searchPattern);
        }

        // Get total count
        const countQuery = query.replace(
            'SELECT cs.*, u.first_name as assigned_first_name, u.last_name as assigned_last_name',
            'SELECT COUNT(*) as total'
        );
        const [countResult] = await pool.execute(countQuery, params);
        const total = countResult[0].total;

        // Get paginated results
        query += ' ORDER BY cs.created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), offset);

        const [submissions] = await pool.execute(query, params);

        res.json({
            success: true,
            data: submissions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get contact submissions error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch contact submissions'
        });
    }
};

/**
 * Get single contact submission (Admin only)
 */
exports.getContactSubmission = async (req, res) => {
    try {
        const { id } = req.params;

        const [submissions] = await pool.execute(
            `SELECT 
        cs.*,
        u.first_name as assigned_first_name,
        u.last_name as assigned_last_name,
        u.email as assigned_email
      FROM contact_submissions cs
      LEFT JOIN users u ON cs.assigned_to = u.id
      WHERE cs.id = ?`,
            [id]
        );

        if (submissions.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Contact submission not found'
            });
        }

        res.json({
            success: true,
            data: submissions[0]
        });
    } catch (error) {
        console.error('Get contact submission error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch contact submission'
        });
    }
};

/**
 * Update contact submission status (Admin only)
 */
exports.updateContactSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, priority, assigned_to, notes } = req.body;

        const updateFields = [];
        const updateValues = [];

        if (status) {
            updateFields.push('status = ?');
            updateValues.push(status);

            // Set resolved_at if status is resolved or closed
            if (status === 'resolved' || status === 'closed') {
                updateFields.push('resolved_at = NOW()');
            }
        }

        if (priority) {
            updateFields.push('priority = ?');
            updateValues.push(priority);
        }

        if (assigned_to !== undefined) {
            updateFields.push('assigned_to = ?');
            updateValues.push(assigned_to || null);
        }

        if (notes !== undefined) {
            updateFields.push('notes = ?');
            updateValues.push(notes);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No fields to update'
            });
        }

        updateValues.push(id);

        await pool.execute(
            `UPDATE contact_submissions SET ${updateFields.join(', ')} WHERE id = ?`,
            updateValues
        );

        res.json({
            success: true,
            message: 'Contact submission updated successfully'
        });
    } catch (error) {
        console.error('Update contact submission error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update contact submission'
        });
    }
};

/**
 * Delete contact submission (Admin only)
 */
exports.deleteContactSubmission = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.execute('DELETE FROM contact_submissions WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Contact submission deleted successfully'
        });
    } catch (error) {
        console.error('Delete contact submission error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete contact submission'
        });
    }
};

/**
 * Get contact statistics (Admin only)
 */
exports.getContactStatistics = async (req, res) => {
    try {
        // Get counts by status
        const [statusCounts] = await pool.execute(`
      SELECT status, COUNT(*) as count
      FROM contact_submissions
      GROUP BY status
    `);

        // Get counts by inquiry type
        const [inquiryTypeCounts] = await pool.execute(`
      SELECT inquiry_type, COUNT(*) as count
      FROM contact_submissions
      GROUP BY inquiry_type
    `);

        // Get recent submissions (last 7 days)
        const [recentCount] = await pool.execute(`
      SELECT COUNT(*) as count
      FROM contact_submissions
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    `);

        // Get average response time (time to first status change)
        const [avgResponseTime] = await pool.execute(`
      SELECT AVG(TIMESTAMPDIFF(HOUR, created_at, updated_at)) as avg_hours
      FROM contact_submissions
      WHERE status != 'new'
    `);

        res.json({
            success: true,
            data: {
                by_status: statusCounts,
                by_inquiry_type: inquiryTypeCounts,
                recent_submissions: recentCount[0].count,
                avg_response_time_hours: avgResponseTime[0].avg_hours || 0
            }
        });
    } catch (error) {
        console.error('Get contact statistics error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch contact statistics'
        });
    }
};
