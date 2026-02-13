import type { FC } from 'react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Send, CheckCircle, Clock } from 'lucide-react';
import { COMPANY_INFO, CONTACT_INFO, SOCIAL_LINKS } from '../../utils/constants';
import { contactService } from '../../services/contact';
import { settingsService } from '../../services/settings';
import { officesService, type Office } from '../../services/offices';
import { useEffect } from 'react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subStatus, setSubStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dynamicSettings, setDynamicSettings] = useState<Record<string, string>>({});
  const [primaryOffice, setPrimaryOffice] = useState<Office | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, officesRes] = await Promise.all([
          settingsService.getSettings(),
          officesService.getOffices()
        ]);
        if (settingsRes.success) setDynamicSettings(settingsRes.data);
        if (officesRes.success) {
          const primary = officesRes.data.find((o: Office) => o.is_primary) || officesRes.data[0];
          setPrimaryOffice(primary);
        }
      } catch (error) {
        console.error('Failed to fetch footer data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;

    setIsSubmitting(true);
    try {
      const response = await contactService.subscribeNewsletter(subscribeEmail);
      setSubStatus({ type: 'success', message: response.message });
      setSubscribeEmail('');
    } catch (error: any) {
      setSubStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-gradient-dark text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Information */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                  <span className="text-white font-bold text-2xl font-serif">S</span>
                </div>
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-20 blur-lg"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-serif text-gradient">{COMPANY_INFO.name}</h3>
                <p className="text-gray-300 font-medium tracking-wider uppercase text-sm">{COMPANY_INFO.tagline}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-8 max-w-lg text-lg leading-relaxed">
              {COMPANY_INFO.description}
            </p>
            <div className="flex space-x-6">
              <a
                href={dynamicSettings.social_linkedin || SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12  /10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-blue-600 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-glow">
                  <Linkedin className="w-6 h-6" />
                </div>
              </a>
              <a
                href={dynamicSettings.social_twitter || SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12  /10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-sky-500 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-glow">
                  <Twitter className="w-6 h-6" />
                </div>
              </a>
              <a
                href={dynamicSettings.social_facebook || SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12  /10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-blue-700 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-glow">
                  <Facebook className="w-6 h-6" />
                </div>
              </a>
              <a
                href={dynamicSettings.social_instagram || SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12  /10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-glow">
                  <Instagram className="w-6 h-6" />
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/manufacturing" className="text-gray-300 hover:text-white transition-colors">
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 underline decoration-blue-500 decoration-2 underline-offset-8">Primary Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="text-gray-300 text-sm leading-relaxed">
                  <p>{primaryOffice?.address || dynamicSettings.contact_address || CONTACT_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                <a
                  href={`tel:${primaryOffice?.phone || dynamicSettings.contact_phone || CONTACT_INFO.phone}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {primaryOffice?.phone || dynamicSettings.contact_phone || CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                <a
                  href={`mailto:${primaryOffice?.email || dynamicSettings.contact_email || CONTACT_INFO.email}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {primaryOffice?.email || dynamicSettings.contact_email || CONTACT_INFO.email}
                </a>
              </div>
              {primaryOffice?.hours_mon_fri && (
                <div className="flex items-start space-x-3 group pt-2 border-t border-gray-800">
                  <Clock className="w-4 h-4 text-orange-500 mt-0.5" />
                  <div className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                    <p>Open: {primaryOffice.hours_mon_fri}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 mb-6">Stay updated with our latest products, manufacturing insights, and exclusive offers.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 shadow-lg border border-gray-300 dark:border-gray-700"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Subscribe
                  </>
                )}
              </button>
            </form>
            {subStatus.message && (
              <div className={`mt-4 p-3 rounded-lg inline-flex items-center gap-2 ${subStatus.type === 'success' ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'}`}>
                {subStatus.type === 'success' && <CheckCircle className="w-4 h-4" />}
                {subStatus.message}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} {COMPANY_INFO.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
