import { useState } from 'react';
import type { FC, ChangeEvent, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Card, Button } from '../components/ui';
import { CONTACT_INFO } from '../utils/constants';
import { contactService, type ContactFormData } from '../services/contact';

const Contact: FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    inquiry_type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await contactService.submitContactForm(formData);

      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: response.message || 'Thank you for your message! We will get back to you soon.'
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: '',
          inquiry_type: 'general'
        });
      } else {
        throw new Error(response.message || 'Failed to submit form');
      }
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to submit your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team for quotes, technical support, or any questions about our products and services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="quote">Request a Quote</option>
                    <option value="technical">Technical Support</option>
                    <option value="product">Product Information</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="inquiry_type" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiry_type"
                    name="inquiry_type"
                    value={formData.inquiry_type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="sales">Sales & Quotes</option>
                    <option value="support">Customer Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                {/* Status Messages */}
                {submitStatus.type && (
                  <div className={`p-4 rounded-md flex items-center space-x-2 ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Mail className="w-5 h-5" />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Office Information */}
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      {CONTACT_INFO.address}<br />
                      {CONTACT_INFO.city}, {CONTACT_INFO.state} {CONTACT_INFO.zipCode}<br />
                      {CONTACT_INFO.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-blue-600">
                        {CONTACT_INFO.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-blue-600">
                        {CONTACT_INFO.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <div className="text-gray-600">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Department Contacts */}
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Department Contacts</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Sales Department</h3>
                  <p className="text-gray-600">sales@Shinningpaint.com</p>
                  <p className="text-gray-600">+1 (555) 123-4567 ext. 101</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Technical Support</h3>
                  <p className="text-gray-600">technical@Shinningpaint.com</p>
                  <p className="text-gray-600">+1 (555) 123-4567 ext. 102</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Customer Service</h3>
                  <p className="text-gray-600">support@Shinningpaint.com</p>
                  <p className="text-gray-600">+1 (555) 123-4567 ext. 103</p>
                </div>
              </div>
            </Card>

            {/* Map Placeholder */}
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Interactive Map Coming Soon</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
