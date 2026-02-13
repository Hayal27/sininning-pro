import type { CompanyInfo, ContactInfo } from '../types/index';

export const COMPANY_INFO: CompanyInfo = {
  name: 'Shinning Paint Manufacturing Plc',
  tagline: 'We Paint quality on the road',
  description: 'Leading manufacturer of premium road marking paints, dedicated to enhancing road safety and infrastructure durability.',
  founded: 2016,
  headquarters: 'Ethiopia',
  employees: '100+'
};

export const CONTACT_INFO: ContactInfo = {
  address: 'Addis Ababa',
  city: 'Addis Ababa',
  state: 'Addis Ababa',
  zipCode: '',
  country: 'Ethiopia',
  phone: ' +251963877777',
  email: '420884970@qq.com',
  website: 'www.shinningpaint.com'
};

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'News', href: '/news' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' }
];

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/Shinningpaint',
  twitter: 'https://twitter.com/Shinningpaint',
  facebook: 'https://facebook.com/Shinningpaint',
  instagram: 'https://instagram.com/Shinningpaint'
};
