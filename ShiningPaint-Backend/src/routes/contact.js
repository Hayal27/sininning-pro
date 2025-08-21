const express = require('express');
const { body } = require('express-validator');
const { validationRules, handleValidationErrors } = require('../utils/validation');

const router = express.Router();

// Contact form submission - PUBLIC (no authentication required)
router.post('/submit',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required'),
    body('inquiry_type').optional().isIn(['general', 'technical', 'sales', 'support']),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, email, company, phone, subject, message, inquiry_type } = req.body;
      
      // In a real application, you would:
      // 1. Save to database
      // 2. Send email notification
      // 3. Create a ticket system entry
      
      console.log('📧 Contact Form Submission:', {
        name,
        email,
        company,
        phone,
        subject,
        message,
        inquiry_type,
        timestamp: new Date().toISOString()
      });
      
      // Simulate processing
      const ticketId = `TICKET-${Date.now()}`;
      
      res.json({
        success: true,
        message: 'Thank you for your inquiry! We will get back to you within 24 hours.',
        ticket_id: ticketId
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to submit contact form. Please try again.'
      });
    }
  }
);

// Newsletter subscription - PUBLIC
router.post('/newsletter',
  [
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email } = req.body;
      
      console.log('📰 Newsletter Subscription:', {
        email,
        timestamp: new Date().toISOString()
      });
      
      res.json({
        success: true,
        message: 'Successfully subscribed to our newsletter!'
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to subscribe to newsletter. Please try again.'
      });
    }
  }
);

// Quote request - PUBLIC
router.post('/quote',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('project_details').notEmpty().withMessage('Project details are required'),
    body('products').isArray().withMessage('Products must be an array'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, email, company, phone, products, project_details, timeline } = req.body;
      
      console.log('💰 Quote Request:', {
        name,
        email,
        company,
        phone,
        products,
        project_details,
        timeline,
        timestamp: new Date().toISOString()
      });
      
      const quoteId = `QUOTE-${Date.now()}`;
      
      res.json({
        success: true,
        message: 'Quote request submitted successfully! We will send you a detailed quote within 2 business days.',
        quote_id: quoteId
      });
    } catch (error) {
      console.error('Quote request error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to submit quote request. Please try again.'
      });
    }
  }
);

// Technical support request - PUBLIC
router.post('/support',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('issue_description').notEmpty().withMessage('Issue description is required'),
    body('urgency').isIn(['low', 'medium', 'high', 'critical']).withMessage('Valid urgency level is required'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, email, company, phone, product_name, issue_description, urgency } = req.body;
      
      console.log('🔧 Technical Support Request:', {
        name,
        email,
        company,
        phone,
        product_name,
        issue_description,
        urgency,
        timestamp: new Date().toISOString()
      });
      
      const ticketId = `SUPPORT-${Date.now()}`;
      
      res.json({
        success: true,
        message: 'Technical support request submitted successfully! Our team will contact you soon.',
        ticket_id: ticketId
      });
    } catch (error) {
      console.error('Technical support request error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to submit support request. Please try again.'
      });
    }
  }
);

module.exports = router;
