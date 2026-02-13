import { apiService } from './api';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  inquiry_type?: 'general' | 'technical' | 'sales' | 'support';
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  ticket_id?: string;
}

export const contactService = {
  // Submit contact form
  async submitContactForm(formData: ContactFormData): Promise<ContactSubmissionResponse> {
    try {
      const response = await apiService.post('/contact/submit', formData);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to submit contact form');
    }
  },

  // Subscribe to newsletter
  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiService.post('/subscriptions/subscribe', { email });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to subscribe to newsletter');
    }
  },

  // Request quote
  async requestQuote(quoteData: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    products: Array<{
      product_id: number;
      quantity: number;
      specifications?: string;
    }>;
    project_details: string;
    timeline?: string;
  }): Promise<{ success: boolean; message: string; quote_id?: string }> {
    try {
      const response = await apiService.post('/contact/quote', quoteData);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to submit quote request');
    }
  },

  // Request technical support
  async requestTechnicalSupport(supportData: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    product_name?: string;
    issue_description: string;
    urgency: 'low' | 'medium' | 'high' | 'critical';
  }): Promise<{ success: boolean; message: string; ticket_id?: string }> {
    try {
      const response = await apiService.post('/contact/support', supportData);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to submit support request');
    }
  }
};
