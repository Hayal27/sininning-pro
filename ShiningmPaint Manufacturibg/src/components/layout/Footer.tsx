import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { COMPANY_INFO, CONTACT_INFO, SOCIAL_LINKS } from '../../utils/constants';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

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
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-blue-600 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-glow">
                  <Linkedin className="w-6 h-6" />
                </div>
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-sky-500 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-glow">
                  <Twitter className="w-6 h-6" />
                </div>
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-blue-700 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-glow">
                  <Facebook className="w-6 h-6" />
                </div>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-glow">
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
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="text-gray-300">
                  <p>{CONTACT_INFO.address}</p>
                  <p>{CONTACT_INFO.city}, {CONTACT_INFO.state} {CONTACT_INFO.zipCode}</p>
                  <p>{CONTACT_INFO.country}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} {COMPANY_INFO.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
