// Company Information Types
export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  founded: number;
  headquarters: string;
  employees: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  applications: string[];
  technicalSpecs?: TechnicalSpec[];
  imageUrl?: string;
}

export interface TechnicalSpec {
  property: string;
  value: string;
  unit?: string;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  benefits: string[];
  imageUrl?: string;
}

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl?: string;
  linkedin?: string;
  email?: string;
}

// Contact Information Types
export interface ContactInfo {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Manufacturing Capability Types
export interface ManufacturingCapability {
  id: string;
  name: string;
  description: string;
  capacity: string;
  equipment: string[];
  certifications: string[];
  imageUrl?: string;
}

// Hero Section Types
export interface HeroSection {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  is_active: boolean;
}

