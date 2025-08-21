import type { CompanyInfo, ContactInfo } from '../types/index';

export const COMPANY_INFO: CompanyInfo = {
  name: 'ShinningPaint Manufacturing PLC',
  tagline: 'Excellence in Every Coat',
  description: 'Leading manufacturer of high-quality paints and coatings for industrial, commercial, and residential applications.',
  founded: 1985,
  headquarters: 'Industrial District, Manufacturing City',
  employees: '500+'
};

export const CONTACT_INFO: ContactInfo = {
  address: '123 Industrial Boulevard',
  city: 'Manufacturing City',
  state: 'Industrial State',
  zipCode: '12345',
  country: 'Country',
  phone: '+1 (555) 123-4567',
  email: 'info@Shinningpaint.com',
  website: 'www.Shinningpaint.com'
};

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { 
    label: 'Products', 
    href: '/products',
    children: [
      { label: 'Industrial Paints', href: '/products/industrial' },
      { label: 'Architectural Coatings', href: '/products/architectural' },
      { label: 'Specialty Finishes', href: '/products/specialty' }
    ]
  },
  { label: 'Orders', href: '/orders' },
  { label: 'Factory Tour', href: '/tour' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Contact', href: '/contact' }
];

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/Shinningpaint',
  twitter: 'https://twitter.com/Shinningpaint',
  facebook: 'https://facebook.com/Shinningpaint',
  instagram: 'https://instagram.com/Shinningpaint'
};
