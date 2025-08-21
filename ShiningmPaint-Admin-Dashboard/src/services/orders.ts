import { apiService } from './api';
import type { Order, PaginatedResponse } from '../types';

export interface OrderFilters {
  status?: string;
  paymentStatus?: string;
  customerId?: string;
  dateFrom?: string;
  dateTo?: string;
  minTotal?: number;
  maxTotal?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const ordersService = {
  async getOrders(
    page: number = 1,
    limit: number = 10,
    filters?: OrderFilters
  ): Promise<PaginatedResponse<Order>> {
    const params = {
      page,
      limit,
      ...filters,
    };
    return await apiService.getPaginated<Order>('/orders', params);
  },

  async getOrder(id: string): Promise<Order> {
    const response = await apiService.get<Order>(`/orders/${id}`);
    return response.data;
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const response = await apiService.put<Order>(`/orders/${id}/status`, { status });
    return response.data;
  },

  async updatePaymentStatus(id: string, paymentStatus: Order['paymentStatus']): Promise<Order> {
    const response = await apiService.put<Order>(`/orders/${id}/payment-status`, { paymentStatus });
    return response.data;
  },

  async cancelOrder(id: string, reason?: string): Promise<Order> {
    const response = await apiService.put<Order>(`/orders/${id}/cancel`, { reason });
    return response.data;
  },

  async refundOrder(id: string, amount?: number, reason?: string): Promise<Order> {
    const response = await apiService.post<Order>(`/orders/${id}/refund`, { amount, reason });
    return response.data;
  },

  async addTrackingNumber(id: string, trackingNumber: string, carrier?: string): Promise<Order> {
    const response = await apiService.put<Order>(`/orders/${id}/tracking`, {
      trackingNumber,
      carrier,
    });
    return response.data;
  },

  async getOrderStatistics(dateFrom?: string, dateTo?: string): Promise<any> {
    const params = { dateFrom, dateTo };
    const response = await apiService.get('/orders/statistics', params);
    return response.data;
  },

  async exportOrders(filters?: OrderFilters): Promise<void> {
    await apiService.downloadFile('/orders/export', 'orders.csv');
  },

  async bulkUpdateStatus(orderIds: string[], status: Order['status']): Promise<void> {
    await apiService.post('/orders/bulk-update-status', { orderIds, status });
  },

  async getRecentOrders(limit: number = 10): Promise<Order[]> {
    const response = await apiService.get<Order[]>(`/orders/recent?limit=${limit}`);
    return response.data;
  },

  async getPendingOrders(): Promise<Order[]> {
    const response = await apiService.get<Order[]>('/orders/pending');
    return response.data;
  },

  async getOrdersByCustomer(customerId: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Order>> {
    const params = { page, limit };
    return await apiService.getPaginated<Order>(`/orders/customer/${customerId}`, params);
  },

  async generateInvoice(id: string): Promise<void> {
    await apiService.downloadFile(`/orders/${id}/invoice`, `invoice-${id}.pdf`);
  },

  async generatePackingSlip(id: string): Promise<void> {
    await apiService.downloadFile(`/orders/${id}/packing-slip`, `packing-slip-${id}.pdf`);
  },

  async sendOrderConfirmation(id: string): Promise<void> {
    await apiService.post(`/orders/${id}/send-confirmation`);
  },

  async sendShippingNotification(id: string): Promise<void> {
    await apiService.post(`/orders/${id}/send-shipping-notification`);
  },
};
