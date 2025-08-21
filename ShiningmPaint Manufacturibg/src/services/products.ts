import { apiService } from './api';

export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  category_id?: number;
  category_name?: string;
  price: number;
  cost_price?: number;
  stock_quantity: number;
  min_stock_level: number;
  max_stock_level: number;
  unit: string;
  color_code?: string;
  finish_type?: string;
  coverage_area?: number;
  drying_time?: string;
  images: string[];
  specifications: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  description?: string;
  parent_id?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: 'active' | 'inactive';
  lowStock?: boolean;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const productsService = {
  // Get all products with filters
  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await apiService.get(`/products?${params.toString()}`);
    return response;
  },

  // Get single product by ID
  async getProduct(id: number): Promise<Product> {
    const response = await apiService.get(`/products/${id}`);
    return response.data;
  },

  // Get featured products (for homepage)
  async getFeaturedProducts(limit: number = 6): Promise<Product[]> {
    const response = await apiService.get(`/products?limit=${limit}&status=active`);
    return response.data || response; // Handle both formats
  },

  // Get products by category
  async getProductsByCategory(categoryId: number, limit?: number): Promise<Product[]> {
    const params = new URLSearchParams({ category: categoryId.toString() });
    if (limit) params.append('limit', limit.toString());
    
    const response = await apiService.get(`/products?${params.toString()}`);
    return response.data;
  },

  // Search products
  async searchProducts(query: string, limit: number = 20): Promise<Product[]> {
    const response = await apiService.get(`/products?search=${encodeURIComponent(query)}&limit=${limit}`);
    return response.data;
  },

  // Get product categories
  async getCategories(): Promise<ProductCategory[]> {
    const response = await apiService.get('/products/categories');
    return response.data;
  },

  // Create product (admin only)
  async createProduct(productData: Partial<Product>): Promise<Product> {
    const response = await apiService.post('/products', productData);
    return response.data;
  },

  // Update product (admin/manager only)
  async updateProduct(id: number, productData: Partial<Product>): Promise<Product> {
    const response = await apiService.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product (admin only)
  async deleteProduct(id: number): Promise<void> {
    await apiService.delete(`/products/${id}`);
  }
};
