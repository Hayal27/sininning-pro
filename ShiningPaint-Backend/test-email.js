require('dotenv').config();
const sendEmail = require('./src/utils/sendEmail');

async function testEmail() {
    try {
        console.log('Testing email configuration...');
        console.log('SMTP_HOST:', process.env.SMTP_HOST);
        console.log('SMTP_PORT:', process.env.SMTP_PORT);
        console.log('EMAIL_USER:', process.env.EMAIL_USER);
        console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
        console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

        await sendEmail({
            email: process.env.EMAIL_USER,
            subject: 'Test Email',
            message: 'This is a test email',
            html: '<p>This is a test email</p>'
        });

        console.log('✅ Email sent successfully!');
    } catch (error) {
        console.error('❌ Email test failed:');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error stack:', error.stack);
    }
}

testEmail();
