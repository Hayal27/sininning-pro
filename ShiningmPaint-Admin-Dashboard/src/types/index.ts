// User types
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'owner' | 'admin' | 'manager' | 'employee' | 'content-manager' | 'hr';
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  phone?: string;
  lastLogin?: string;
}

// Hero Section types
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


// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  sku: string;
  stock: number;
  minStock: number;
  images: string[];
  specifications: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Order types
export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

// Address type
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Customer types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

// Analytics types
export interface SalesData {
  date: string;
  sales: number;
  orders: number;
  customers: number;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  salesGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  productsGrowth: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  error?: string;
  errors?: any[];
  details?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface ProductForm {
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  sku: string;
  stock: number;
  minStock: number;
  images: File[];
  specifications: Record<string, any>;
  isActive: boolean;
}

// Table types
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  current?: boolean;
  children?: NavItem[];
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  read: boolean;
  createdAt: string;
}

// Filter types
export interface FilterOption {
  label: string;
  value: string;
}

export interface DateRange {
  start: Date;
  end: Date;
}

// Export types
export interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf';
  dateRange?: DateRange;
  filters?: Record<string, any>;
}
