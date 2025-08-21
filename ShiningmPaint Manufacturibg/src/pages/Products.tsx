import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { productsService, type Product, type ProductFilters } from '../services/products';
import { formatCurrency } from '../utils/format';

const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    limit: 12,
    status: 'active'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsService.getProducts(filters);
      setProducts(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      search: searchQuery,
      page: 1
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ProductCard: FC<{ product: Product }> = ({ product }) => (
    <Card className="group hover:scale-105 transition-transform duration-300 overflow-hidden" shadow="lg">
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-white" />
          </div>
        )}
        {product.color_code && (
          <div
            className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-white shadow-lg"
            style={{ backgroundColor: product.color_code }}
          ></div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center ml-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-500 ml-1">4.8</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(product.price)}
          </div>
          <div className="text-sm text-gray-500">
            per {product.unit}
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">SKU: {product.sku}</span>
          <span className={`text-sm px-2 py-1 rounded-full ${
            product.stock_quantity > product.min_stock_level
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <Link to={`/products/${product.id}`} className="group/link">
          <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
            <span>View Details</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of high-quality paints and coatings for every application
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <Card key={index} className="animate-pulse" shadow="lg">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  Previous
                </Button>

                {[...Array(pagination.pages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <Button
                      key={page}
                      variant={pagination.page === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
