import { apiService } from './api';
import type { Product, ProductForm, PaginatedResponse } from '../types';

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const productsService = {
  async getProducts(
    page: number = 1,
    limit: number = 10,
    filters?: ProductFilters
  ): Promise<PaginatedResponse<Product>> {
    const params = {
      page,
      limit,
      ...filters,
    };
    return await apiService.getPaginated<Product>('/products', params);
  },

  async getProduct(id: string): Promise<Product> {
    const response = await apiService.get<Product>(`/products/${id}`);
    return response.data;
  },

  async createProduct(productData: ProductForm): Promise<Product> {
    const formData = new FormData();
    
    // Append basic fields
    Object.keys(productData).forEach(key => {
      if (key !== 'images' && key !== 'specifications') {
        formData.append(key, (productData as any)[key]);
      }
    });

    // Append specifications as JSON
    formData.append('specifications', JSON.stringify(productData.specifications));

    // Append images
    productData.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    const response = await apiService.post<Product>('/products', formData);
    return response.data;
  },

  async updateProduct(id: string, productData: Partial<ProductForm>): Promise<Product> {
    const formData = new FormData();
    
    // Append basic fields
    Object.keys(productData).forEach(key => {
      if (key !== 'images' && key !== 'specifications') {
        formData.append(key, (productData as any)[key]);
      }
    });

    // Append specifications as JSON if provided
    if (productData.specifications) {
      formData.append('specifications', JSON.stringify(productData.specifications));
    }

    // Append new images if provided
    if (productData.images) {
      productData.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    const response = await apiService.put<Product>(`/products/${id}`, formData);
    return response.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await apiService.delete(`/products/${id}`);
  },

  async bulkDeleteProducts(ids: string[]): Promise<void> {
    await apiService.post('/products/bulk-delete', { ids });
  },

  async updateStock(id: string, stock: number): Promise<Product> {
    const response = await apiService.put<Product>(`/products/${id}/stock`, { stock });
    return response.data;
  },

  async bulkUpdateStock(updates: { id: string; stock: number }[]): Promise<void> {
    await apiService.post('/products/bulk-update-stock', { updates });
  },

  async getCategories(): Promise<string[]> {
    const response = await apiService.get<string[]>('/products/categories');
    return response.data;
  },

  async getLowStockProducts(): Promise<Product[]> {
    const response = await apiService.get<Product[]>('/products/low-stock');
    return response.data;
  },

  async exportProducts(filters?: ProductFilters): Promise<void> {
    await apiService.downloadFile('/products/export', 'products.csv');
  },

  async importProducts(file: File): Promise<void> {
    await apiService.uploadFile('/products/import', file);
  },

  async duplicateProduct(id: string): Promise<Product> {
    const response = await apiService.post<Product>(`/products/${id}/duplicate`);
    return response.data;
  },

  async toggleProductStatus(id: string): Promise<Product> {
    const response = await apiService.put<Product>(`/products/${id}/toggle-status`);
    return response.data;
  },
};
