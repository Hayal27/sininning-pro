import { useState } from 'react';
import type { FC, ChangeEvent, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Headphones, DollarSign } from 'lucide-react';
import { Card, Button } from '../components/ui';
import { contactService, type ContactFormData } from '../services/contact';
import { settingsService } from '../services/settings';
import { officesService, type Office } from '../services/offices';
import { useEffect } from 'react';

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

  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subStatus, setSubStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [dynamicSettings, setDynamicSettings] = useState<Record<string, string>>({});
  const [offices, setOffices] = useState<Office[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, officesRes] = await Promise.all([
          settingsService.getSettings(),
          officesService.getOffices()
        ]);
        if (settingsRes.success) setDynamicSettings(settingsRes.data);
        if (officesRes.success) setOffices(officesRes.data);
      } catch (error) {
        console.error('Failed to fetch contact data:', error);
      }
    };
    fetchData();
  }, []);

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

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;

    try {
      const response = await contactService.subscribeNewsletter(subscribeEmail);
      setSubStatus({ type: 'success', message: response.message });
      setSubscribeEmail('');
    } catch (error: any) {
      setSubStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Have questions about our products or services? Our team is here to help you find the perfect solution.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <Card padding="lg" className="shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Send us a Message</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+251 XXX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  <label htmlFor="inquiry_type" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiry_type"
                    name="inquiry_type"
                    value={formData.inquiry_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="sales">Sales & Quotes</option>
                    <option value="support">Customer Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                {/* Status Messages */}
                {submitStatus.type && (
                  <div className={`p-4 rounded-xl flex items-center space-x-3 ${submitStatus.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-2 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-2 border-red-200 dark:border-red-800'
                    }`}>
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <Mail className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className="font-medium">{submitStatus.message}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          {/* Contact Information & Branches */}
          <div className="space-y-6">
            {offices.map((office) => (
              <Card
                key={office.id}
                padding="lg"
                className={`shadow-xl transition-all duration-300 hover:scale-[1.02] ${office.is_primary
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700'
                  }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{office.name}</h2>
                  {office.is_primary && (
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase rounded-full shadow-lg">HQ</span>
                  )}
                </div>

                <div className="space-y-5">
                  <div className="flex items-start space-x-4 group">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Address</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{office.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Phone</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        <a href={`tel:${office.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {office.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Email</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        <a href={`mailto:${office.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {office.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  {office.hours_mon_fri && (
                    <div className="flex items-start space-x-4 group">
                      <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Business Hours</h3>
                        <div className="text-gray-600 dark:text-gray-400 text-xs space-y-1">
                          <p>Mon - Fri: {office.hours_mon_fri}</p>
                          <p>Sat: {office.hours_sat}</p>
                          <p>Sun: {office.hours_sun}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}

            {/* Department Contacts (Dynamic from settings) */}
            {(dynamicSettings.contact_sales_email || dynamicSettings.contact_tech_email) && (
              <Card padding="lg" className="shadow-xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Department Channels</h2>
                <div className="grid grid-cols-1 gap-4">
                  {dynamicSettings.contact_sales_email && (
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">Sales</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">{dynamicSettings.contact_sales_email}</p>
                    </div>
                  )}
                  {dynamicSettings.contact_tech_email && (
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Headphones className="w-4 h-4 text-purple-600" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">Support</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">{dynamicSettings.contact_tech_email}</p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-8 text-blue-100 text-lg">Stay updated with our latest products, manufacturing insights, and exclusive offers.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input
              type="email"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl font-medium"
              required
            />
            <button
              type="submit"
              className="px-10 py-4 bg-white text-blue-700 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105 hover:shadow-white/20"
            >
              Subscribe
            </button>
          </form>
          {subStatus.message && (
            <div className={`mt-6 p-4 rounded-xl inline-block font-semibold ${subStatus.type === 'success' ? 'bg-green-500/30 text-green-100' : 'bg-red-500/30 text-red-100'}`}>
              {subStatus.message}
            </div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[400px] relative grayscale hover:grayscale-0 transition-all duration-700 rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.698614479135676%2C8.937780470786089%2C38.718614479135676%2C8.957780470786089&layer=mapnik&marker=8.947780470786089%2C38.708614479135676"
              style={{ border: 0 }}
              title="Shinning Paint Manufacturing - Location"
            ></iframe>
            <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur px-6 py-3 rounded-xl shadow-2xl text-sm font-semibold">
              <a
                href="https://www.openstreetmap.org/?mlat=8.947780470786089&mlon=38.708614479135676#map=15/8.947780470786089/38.708614479135676"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
              >
                📍 View Larger Map
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
