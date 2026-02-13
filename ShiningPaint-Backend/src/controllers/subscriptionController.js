const { pool } = require('../config/database');
const sendEmail = require('../utils/sendEmail');

// @desc    Subscribe to newsletter
// @route   POST /api/subscriptions/subscribe
// @access  Public
const subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Please provide an email address' });
        }

        // Check if already subscribed
        const [existing] = await pool.execute('SELECT * FROM subscriptions WHERE email = ?', [email]);

        if (existing.length > 0) {
            if (existing[0].status === 'active') {
                return res.status(200).json({ success: true, message: 'You are already subscribed!' });
            } else {
                await pool.execute('UPDATE subscriptions SET status = "active", subscribed_at = NOW() WHERE email = ?', [email]);
            }
        } else {
            await pool.execute('INSERT INTO subscriptions (email) VALUES (?)', [email]);
        }

        // Send confirmation email
        const message = `Thank you for subscribing to  ShinningPaint newsletter! We are excited to keep you updated with our latest products and exclusive offers.`;

        // Fire and forget email sending to avoid blocking the response
        sendEmail({
            email: email,
            subject: 'Welcome to  ShinningPaint Newsletter',
            message: message,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563EB;">Welcome to  ShinningPaint!</h2>
          <p>${message}</p>
          <p>Best Regards,<br> ShinningPaint Team</p>
        </div>
      `
        }).catch(emailError => {
            console.error('Email send failed:', emailError);
        });

        res.status(200).json({ success: true, message: 'Subscription successful! Please check your email.' });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get all subscriptions
// @route   GET /api/subscriptions
// @access  Private (Admin/Manager)
const getSubscriptions = async (req, res) => {
    try {
        const [subs] = await pool.execute('SELECT * FROM subscriptions ORDER BY subscribed_at DESC');
        res.status(200).json({ success: true, data: subs });
    } catch (error) {
        console.error('Get subscriptions error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    subscribe,
    getSubscriptions
};
