import { apiService } from './api';

export interface Customer {
  id: number;
  company_name?: string;
  contact_person: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country: string;
  customer_type: 'retail' | 'wholesale' | 'contractor';
  credit_limit: number;
  payment_terms: string;
  tax_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  recent_orders?: any[];
}

export interface CustomerFilters {
  page?: number;
  limit?: number;
  search?: string;
  type?: 'retail' | 'wholesale' | 'contractor';
  status?: 'active' | 'inactive';
}

export interface CustomersResponse {
  success: boolean;
  data: Customer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const customersService = {
  // Get all customers with filters
  async getCustomers(filters: CustomerFilters = {}): Promise<CustomersResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await apiService.get(`/customers?${params.toString()}`);
    return response;
  },

  // Get single customer by ID
  async getCustomer(id: number): Promise<Customer> {
    const response = await apiService.get(`/customers/${id}`);
    return response.data;
  },

  // Create customer
  async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
    const response = await apiService.post('/customers', customerData);
    return response.data;
  },

  // Update customer
  async updateCustomer(id: number, customerData: Partial<Customer>): Promise<Customer> {
    const response = await apiService.put(`/customers/${id}`, customerData);
    return response.data;
  },

  // Delete customer (admin only)
  async deleteCustomer(id: number): Promise<void> {
    await apiService.delete(`/customers/${id}`);
  },

  // Get customer statistics
  async getCustomerStats(): Promise<any> {
    const response = await apiService.get('/analytics/customers');
    return response.data;
  }
};
