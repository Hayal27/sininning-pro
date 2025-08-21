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
