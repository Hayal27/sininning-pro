const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Debug email config
    console.log('Email Config Check:', {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        user: process.env.EMAIL_USER ? 'Set' : 'MISSING',
        pass: process.env.EMAIL_PASS ? 'Set' : 'MISSING'
    });

    const smtpPort = parseInt(process.env.SMTP_PORT) || 587;
    const transporter = nodemailer.createTransport({
        // service: 'gmail', // valid if using gmail, but generic host/port is better
        host: process.env.SMTP_HOST || 'smtp.gmail.com', // Default to gmail for now
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: `${process.env.FROM_NAME || ' ShinningPaint'} <${process.env.FROM_EMAIL || process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
        attachments: options.attachments
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
