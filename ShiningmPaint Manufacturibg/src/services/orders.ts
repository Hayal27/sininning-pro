import { apiService } from './api';

export interface OrderItem {
  id?: number;
  product_id: number;
  product_name?: string;
  sku?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: number;
  order_number: string;
  customer_id: number;
  customer_name?: string;
  company_name?: string;
  contact_person?: string;
  user_id?: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  order_date: string;
  required_date?: string;
  shipped_date?: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  payment_status: 'pending' | 'partial' | 'paid' | 'refunded';
  payment_method?: string;
  shipping_address?: any;
  billing_address?: any;
  notes?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  customer?: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface OrdersResponse {
  success: boolean;
  data: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface CreateOrderData {
  customer_id: number;
  items: Omit<OrderItem, 'id' | 'product_name' | 'sku' | 'total_price'>[];
  required_date?: string;
  shipping_address?: any;
  billing_address?: any;
  notes?: string;
  payment_method?: string;
  discount_amount?: number;
  shipping_amount?: number;
}

export const ordersService = {
  // Get all orders with filters
  async getOrders(filters: OrderFilters = {}): Promise<OrdersResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await apiService.get(`/orders?${params.toString()}`);
    return response;
  },

  // Get single order by ID
  async getOrder(id: number): Promise<Order> {
    const response = await apiService.get(`/orders/${id}`);
    return response.data;
  },

  // Create new order
  async createOrder(orderData: CreateOrderData): Promise<Order> {
    const response = await apiService.post('/orders', orderData);
    return response.data;
  },

  // Update order status
  async updateOrderStatus(id: number, status: Order['status']): Promise<Order> {
    const response = await apiService.put(`/orders/${id}/status`, { status });
    return response.data;
  },

  // Get recent orders
  async getRecentOrders(limit: number = 10): Promise<Order[]> {
    const response = await apiService.get(`/analytics/recent-orders?limit=${limit}`);
    return response.data;
  },

  // Get order statistics
  async getOrderStats(): Promise<any> {
    const response = await apiService.get('/analytics/orders');
    return response.data;
  },

  // Get orders by customer
  async getOrdersByCustomer(customerId: number): Promise<Order[]> {
    const response = await apiService.get(`/orders?customer=${customerId}`);
    return response.data;
  }
};
