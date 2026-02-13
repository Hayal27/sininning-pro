import React, { useState, useEffect } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
  XMarkIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { API_BASE_URL } from '../services/api';

interface Product {
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
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

interface ProductFormData {
  name: string;
  description: string;
  sku: string;
  category_id: string;
  price: string;
  cost_price: string;
  stock_quantity: string;
  min_stock_level: string;
  max_stock_level: string;
  unit: string;
  color_code: string;
  finish_type: string;
  coverage_area: string;
  drying_time: string;
  is_active: boolean;
  is_featured: boolean;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    sku: '',
    category_id: '',
    price: '',
    cost_price: '',
    stock_quantity: '0',
    min_stock_level: '10',
    max_stock_level: '1000',
    unit: 'liters',
    color_code: '',
    finish_type: '',
    coverage_area: '',
    drying_time: '',
    is_active: true,
    is_featured: false,
  });

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchQuery && { search: searchQuery }),
      });

      const response = await fetch(`${API_BASE_URL}/products?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        sku: product.sku,
        category_id: product.category_id?.toString() || '',
        price: product.price.toString(),
        cost_price: product.cost_price?.toString() || '',
        stock_quantity: product.stock_quantity.toString(),
        min_stock_level: product.min_stock_level.toString(),
        max_stock_level: product.max_stock_level.toString(),
        unit: product.unit,
        color_code: product.color_code || '',
        finish_type: product.finish_type || '',
        coverage_area: product.coverage_area?.toString() || '',
        drying_time: product.drying_time || '',
        is_active: product.is_active,
        is_featured: product.is_featured,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        sku: '',
        category_id: '',
        price: '',
        cost_price: '',
        stock_quantity: '0',
        min_stock_level: '10',
        max_stock_level: '1000',
        unit: 'liters',
        color_code: '',
        finish_type: '',
        coverage_area: '',
        drying_time: '',
        is_active: true,
        is_featured: false,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.sku || !formData.price) {
      alert('Please fill in all required fields (Name, SKU, Price)');
      return;
    }


    const productData: any = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      sku: formData.sku.trim(),
      price: parseFloat(formData.price),
      stock_quantity: parseInt(formData.stock_quantity) || 0,
      min_stock_level: parseInt(formData.min_stock_level) || 10,
      max_stock_level: parseInt(formData.max_stock_level) || 1000,
      unit: formData.unit,
      is_active: formData.is_active,
      is_featured: formData.is_featured,
      images: [],
      specifications: {},
    };

    // Only add optional fields if they have values
    if (formData.category_id && formData.category_id.trim()) {
      productData.category_id = parseInt(formData.category_id);
    }

    if (formData.cost_price && formData.cost_price.trim()) {
      productData.cost_price = parseFloat(formData.cost_price);
    }

    if (formData.color_code && formData.color_code.trim()) {
      productData.color_code = formData.color_code;
    }

    if (formData.finish_type && formData.finish_type.trim()) {
      productData.finish_type = formData.finish_type;
    }

    if (formData.coverage_area && formData.coverage_area.trim()) {
      productData.coverage_area = parseFloat(formData.coverage_area);
    }

    if (formData.drying_time && formData.drying_time.trim()) {
      productData.drying_time = formData.drying_time;
    }

    console.log('Submitting product data:', productData);

    try {
      const url = editingProduct
        ? `${API_BASE_URL}/products/${editingProduct.id}`
        : `${API_BASE_URL}/products`;

      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not authenticated. Please log in again.');
        return;
      }

      console.log('Making request to:', url);
      console.log('Method:', editingProduct ? 'PUT' : 'POST');

      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.success) {
        alert(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
        handleCloseModal();
        fetchProducts();
      } else {
        // Handle validation errors
        console.error('Validation failed:', data);
        if (data.errors && Array.isArray(data.errors)) {
          console.error('Validation errors:', data.errors);
          const errorMessages = data.errors.map((err: any) => `${err.param}: ${err.msg}`).join('\n');
          alert(`Validation errors:\n${errorMessages}`);
        } else {
          alert(data.error || data.message || 'Failed to save product');
        }
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Network error: Failed to save product. Please check your connection and try again.');
    }
  };

  const handleDelete = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const toggleFeatured = async (productId: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ is_featured: !currentStatus }),
      });

      const data = await response.json();
      if (data.success) {
        setProducts(products.map(p =>
          p.id === productId ? { ...p, is_featured: !currentStatus } : p
        ));
      }
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Products</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage your product catalog and inventory</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-2xl hover:scale-105 font-semibold">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-purple-500" />
          </div>
          <input
            type="text"
            placeholder="Search products by name, SKU, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                      <p className="mt-4 text-text-secondary">Loading products...</p>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-text-secondary opacity-50" />
                    <p className="mt-4 text-text-secondary">No products found</p>
                    <button
                      onClick={() => handleOpenModal()}
                      className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Create your first product
                    </button>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-surface-hover transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {product.color_code ? (
                            <div
                              className="h-12 w-12 rounded-lg shadow-md"
                              style={{ backgroundColor: product.color_code }}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center shadow-md">
                              <span className="text-primary-600 font-bold text-lg">
                                {product.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-text-primary">
                            {product.name}
                          </div>
                          <div className="text-xs text-text-secondary line-clamp-1">
                            {product.category_name || 'Uncategorized'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-text-primary">{product.sku}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-text-primary">
                        {formatCurrency(product.price)}
                      </div>
                      <div className="text-xs text-text-secondary">per {product.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-text-primary">
                        {product.stock_quantity}
                      </div>
                      <div className="text-xs text-text-secondary">
                        Min: {product.min_stock_level}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => toggleFeatured(product.id, product.is_featured)}
                        className="focus:outline-none transition-transform hover:scale-110"
                        title={product.is_featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        {product.is_featured ? (
                          <StarIconSolid className="h-7 w-7 text-yellow-400 hover:text-yellow-500 drop-shadow-lg" />
                        ) : (
                          <StarIcon className="h-7 w-7 text-text-secondary hover:text-yellow-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.is_active
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                      >
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="text-primary-600 hover:text-primary-900 mr-4 transition-colors"
                        title="Edit product"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Delete product"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-surface px-6 py-4 flex items-center justify-between border-t border-border">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-text-primary bg-surface-hover hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-text-primary bg-surface-hover hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-text-secondary">
                  Page <span className="font-semibold">{currentPage}</span> of{' '}
                  <span className="font-semibold">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 rounded-l-lg bg-surface text-text-secondary hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-4 py-2 rounded-r-lg bg-surface text-text-secondary hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Side Drawer Modal */}
      {showModal && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xl z-[100] transition-all duration-300"
            onClick={handleCloseModal}
          ></div>

          {/* Slide-in Drawer from Right */}
          <div className="fixed inset-y-0 right-0 z-[101] w-full sm:w-[600px] lg:w-[750px] flex animate-slide-in-right">
            <div className="w-full bg-surface shadow-2xl flex flex-col max-h-screen">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-5 flex items-center justify-between flex-shrink-0">
                <h3 className="text-xl font-bold text-white" id="modal-title">
                  {editingProduct ? 'Edit Product' : 'Create New Product'}
                </h3>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-white hover:text-gray-200 transition-colors p-1 hover:bg-white/10 rounded-lg"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Form - Scrollable */}
              <div className="flex-1 overflow-y-auto bg-background">
                <form onSubmit={handleSubmit} id="product-form" className="p-6 space-y-8">

                  {/* Basic Information Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-text-primary border-b border-border pb-2">
                      Basic Information
                    </h4>

                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-surface text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="e.g., Premium Interior Paint"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2.5 bg-surface text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                        placeholder="Describe the product features and benefits..."
                      />
                    </div>

                    {/* SKU and Unit Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-2">
                          SKU <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.sku}
                          onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                          className="w-full px-4 py-2.5 bg-surface text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-mono text-sm"
                          placeholder="PIL-WHT-001"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-2">
                          Unit <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={formData.unit}
                          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                          className="w-full px-4 py-2.5 bg-surface text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                          <option value="liters">Liters</option>
                          <option value="gallons">Gallons</option>
                          <option value="quarts">Quarts</option>
                          <option value="kg">Kilograms</option>
                          <option value="sets">Sets</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-text-primary border-b border-border pb-2">
                      Pricing
                    </h4>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Price */}
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-2">
                          Selling Price <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary font-semibold">ETB</span>
                          <input
                            type="number"
                            step="0.01"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full pl-16 pr-4 py-2.5 bg-surface text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="0.00"
                          />
                        </div>
                        <p className="mt-1 text-xs text-text-secondary">Enter price in Ethiopian Birr</p>
                      </div>
                    </div>
                  </div>

                  {/* Inventory Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-text-primary border-b border-border pb-2">
                      Inventory
                    </h4>

                    <div className="grid grid-cols-3 gap-4">
                      {/* Stock Quantity */}
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-2">
                          Current Stock
                        </label>
                        <input
                          type="number"
                          value={formData.stock_quantity}
                          onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                          className="w-full px-4 py-2.5 bg-surface text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="0"
                        />
                      </div>

                      {/* Min Stock Level */}
                      <div>
                        <label className="block text-sm font-semibold text-text-secondary mb-2">
                          Min Level
                        </label>
                        <input
                          type="number"
                          value={formData.min_stock_level}
                          onChange={(e) => setFormData({ ...formData, min_stock_level: e.target.value })}
                          className="w-full px-4 py-2.5 bg-surface text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="10"
                        />
                      </div>

                      {/* Max Stock Level */}
                      <div>
                        <label className="block text-sm font-semibold text-text-secondary mb-2">
                          Max Level
                        </label>
                        <input
                          type="number"
                          value={formData.max_stock_level}
                          onChange={(e) => setFormData({ ...formData, max_stock_level: e.target.value })}
                          className="w-full px-4 py-2.5 bg-surface text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="1000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Specifications Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-text-primary border-b border-border pb-2">
                      Specifications
                    </h4>

                    {/* Color Code */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Color Code
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={formData.color_code || '#000000'}
                          onChange={(e) => setFormData({ ...formData, color_code: e.target.value })}
                          className="h-11 w-16 rounded-lg cursor-pointer border border-border"
                        />
                        <input
                          type="text"
                          value={formData.color_code}
                          onChange={(e) => setFormData({ ...formData, color_code: e.target.value })}
                          className="flex-1 px-4 py-2.5 bg-surface text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-mono text-sm"
                          placeholder="#FFFFFF"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Finish Type */}
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-2">
                          Finish Type
                        </label>
                        <input
                          type="text"
                          value={formData.finish_type}
                          onChange={(e) => setFormData({ ...formData, finish_type: e.target.value })}
                          className="w-full px-4 py-2.5 bg-surface text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="e.g., Satin, Matte, Glossy"
                        />
                      </div>

                      {/* Drying Time */}
                      <div>
                        <label className="block text-sm font-semibold text-text-primary mb-2">
                          Drying Time
                        </label>
                        <input
                          type="text"
                          value={formData.drying_time}
                          onChange={(e) => setFormData({ ...formData, drying_time: e.target.value })}
                          className="w-full px-4 py-2.5 bg-surface text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          placeholder="e.g., 2-4 hours"
                        />
                      </div>
                    </div>

                    {/* Coverage Area */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Coverage Area (sq ft)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.coverage_area}
                        onChange={(e) => setFormData({ ...formData, coverage_area: e.target.value })}
                        className="w-full px-4 py-2.5 bg-surface text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="400"
                      />
                    </div>
                  </div>

                  {/* Status Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-text-primary border-b border-border pb-2">
                      Status & Visibility
                    </h4>

                    <div className="flex gap-6">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={formData.is_active}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                            className="w-5 h-5 text-primary-600 bg-surface border-border rounded focus:ring-2 focus:ring-primary-500 cursor-pointer"
                          />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-text-primary group-hover:text-primary-600 transition-colors">Active</span>
                          <p className="text-xs text-text-secondary">Product is visible and available for sale</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={formData.is_featured}
                            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                            className="w-5 h-5 text-primary-600 bg-surface border-border rounded focus:ring-2 focus:ring-primary-500 cursor-pointer"
                          />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-text-primary group-hover:text-primary-600 transition-colors">Featured</span>
                          <p className="text-xs text-text-secondary">Show on homepage featured section</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex justify-end gap-3 pt-6 border-t border-border sticky bottom-0 bg-background pb-2">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-6 py-2.5 bg-surface text-text-primary border border-border rounded-lg hover:bg-surface-hover transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl font-medium"
                    >
                      {editingProduct ? 'Update Product' : 'Create Product'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};







export default Products;
