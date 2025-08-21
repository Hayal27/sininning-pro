import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Users, Factory, ShoppingCart, Star } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { COMPANY_INFO } from '../utils/constants';
import { productsService, type Product } from '../services/products';
import { formatCurrency } from '../utils/format';

const Home: FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const products = await productsService.getFeaturedProducts(6);
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient text-white py-32 overflow-hidden">
        <div className="hero-overlay"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 dark:bg-blue-400/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 dark:bg-purple-400/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 dark:bg-white/5 rounded-full blur-2xl animate-pulse-slow"></div>

          {/* Magical Sparkles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold tracking-wider uppercase border border-white/20">
                Since 1985 • Premium Quality
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight magical-text glow-text">
              <span className="block text-gradient-gold magical-text">{COMPANY_INFO.tagline.split(' ')[0]}</span>
              <span className="block">{COMPANY_INFO.tagline.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-200 font-light hover-zone">
              {COMPANY_INFO.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/products" className="group">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-2xl text-lg px-12 py-4 ripple magical-border">
                  <span>Explore Products</span>
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/contact" className="group">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-12 py-4 ripple hover-zone">
                  <span>Get Quote</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-divider py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Floating Paint Drops */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Magical Brush Strokes */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <path
              d="M100,300 Q300,200 500,300 T900,300"
              stroke="url(#brushGradient1)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M200,600 Q400,500 600,600 T1000,600"
              stroke="url(#brushGradient2)"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <defs>
              <linearGradient id="brushGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#764ba2" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="brushGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f093fb" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f5576c" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-primary text-white rounded-full text-sm font-semibold tracking-wider uppercase shadow-glow">
                Our Excellence
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-8">
              Why Choose <span className="text-gradient">ShinningPaint</span>?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              With over <span className="text-gradient font-bold">{new Date().getFullYear() - COMPANY_INFO.founded} years</span> of experience, we deliver superior quality and innovation in every product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center group hover:scale-105 transition-transform duration-500 magical-card hover-zone" shadow="lg">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow group-hover:shadow-glow-purple transition-all duration-500 transform group-hover:rotate-6">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-all duration-500 mx-auto w-20 h-20"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">
                Rigorous testing and quality control ensure every product meets the highest international standards.
              </p>
            </Card>

            <Card className="text-center group hover:scale-105 transition-transform duration-500 magical-card hover-zone" shadow="lg">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto shadow-glow group-hover:shadow-glow-purple transition-all duration-500 transform group-hover:rotate-6">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-secondary rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-all duration-500 mx-auto w-20 h-20"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 group-hover:text-purple-600 transition-colors duration-300 magical-text">Industry Leading</h3>
              <p className="text-gray-600 leading-relaxed">
                Award-winning formulations and innovative solutions for diverse industrial applications.
              </p>
            </Card>
            
            <Card className="text-center group hover:scale-105 transition-transform duration-500 magical-card hover-zone" shadow="lg">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto shadow-glow group-hover:shadow-glow-purple transition-all duration-500 transform group-hover:rotate-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-accent rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-all duration-500 mx-auto w-20 h-20"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 group-hover:text-cyan-600 transition-colors duration-300 magical-text">Expert Team</h3>
              <p className="text-gray-600 leading-relaxed">
                <span className="text-gradient font-bold">{COMPANY_INFO.employees}</span> skilled professionals dedicated to excellence and innovation.
              </p>
            </Card>

            <Card className="text-center group hover:scale-105 transition-transform duration-500 magical-card hover-zone" shadow="lg">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto shadow-glow group-hover:shadow-glow-gold transition-all duration-500 transform group-hover:rotate-6">
                  <Factory className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-gold rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-all duration-500 mx-auto w-20 h-20"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 group-hover:text-orange-600 transition-colors duration-300 magical-text">Advanced Manufacturing</h3>
              <p className="text-gray-600 leading-relaxed">
                State-of-the-art facilities with cutting-edge technology and sustainable practices.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-secondary text-white rounded-full text-sm font-semibold tracking-wider uppercase shadow-glow">
                Product Excellence
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-8">
              Our <span className="text-gradient">Product Range</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions for all your coating needs with premium quality and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="group hover:scale-105 transition-all duration-500" shadow="xl">
              <div className="relative h-64 bg-gradient-dark rounded-2xl mb-6 overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Factory className="w-8 h-8 mb-2" />
                  <span className="text-sm font-semibold">Heavy Duty</span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Industrial Paints</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Heavy-duty coatings for industrial applications, machinery, and infrastructure with superior durability.
              </p>
              <Link to="/products/industrial" className="group/link">
                <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </Card>

            <Card className="group hover:scale-105 transition-all duration-500" shadow="xl">
              <div className="relative h-64 bg-gradient-primary rounded-2xl mb-6 overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Users className="w-8 h-8 mb-2" />
                  <span className="text-sm font-semibold">Premium</span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors duration-300">Architectural Coatings</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Premium paints for residential and commercial buildings with lasting beauty and protection.
              </p>
              <Link to="/products/architectural" className="group/link">
                <Button variant="outline" size="sm" className="w-full group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </Card>
            
            <Card className="group hover:scale-105 transition-all duration-500" shadow="xl">
              <div className="relative h-64 bg-gradient-accent rounded-2xl mb-6 overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Award className="w-8 h-8 mb-2" />
                  <span className="text-sm font-semibold">Custom</span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-emerald-300 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">Specialty Finishes</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Custom formulations for unique applications and specialized requirements with innovative technology.
              </p>
              <Link to="/products/specialty" className="group/link">
                <Button variant="outline" size="sm" className="w-full group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-primary text-white rounded-full text-sm font-semibold tracking-wider uppercase shadow-glow">
                Featured Products
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">
              Our <span className="text-gradient">Best Sellers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our most popular products trusted by professionals and homeowners alike
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="group hover:scale-105 transition-transform duration-500 overflow-hidden" shadow="lg">
                  <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="group">
              <Button size="lg" className="bg-gradient-primary text-white hover:shadow-2xl text-lg px-12 py-4">
                <span>View All Products</span>
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 hero-gradient text-white overflow-hidden">
        <div className="hero-overlay"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="mb-8">
              <span className="inline-block px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full text-lg font-semibold tracking-wider uppercase border border-white/20">
                Ready to Transform?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight">
              Ready to Start Your <span className="text-gradient-gold">Project</span>?
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-200">
              Contact our experts today for personalized solutions, competitive pricing, and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact" className="group">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-2xl text-lg px-12 py-4">
                  <span>Get Started Today</span>
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/products" className="group">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-12 py-4">
                  <span>View Products</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
