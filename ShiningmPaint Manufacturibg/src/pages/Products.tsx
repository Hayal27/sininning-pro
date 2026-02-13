import { useState } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Award, Zap, Sun, Timer,
  CheckCircle2, Star, ArrowRight, Sparkles, TrendingUp,
  Layers, Clock
} from 'lucide-react';

const Products: FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<'yellow' | 'white'>('yellow');

  const products = {
    yellow: {
      name: 'Yellow Thermoplastic Road Marking Paint',
      color: '#FFC107',
      tagline: 'Bright, High-Visibility Safety Solution',
      image: '/images/products/yellow-thermoplastic-paint.svg',
      description: 'ASTM-compliant bright yellow thermoplastic paint designed for maximum visibility and durability in high-traffic zones.',
      features: [
        {
          icon: Shield,
          title: 'Exceptional Durability',
          description: 'Resistant to heavy traffic, UV rays, and harsh weather conditions'
        },
        {
          icon: Sparkles,
          title: 'Reflective Technology',
          description: 'Embedded with glass beads for enhanced nighttime visibility'
        },
        {
          icon: Zap,
          title: 'Fast-Drying',
          description: 'Sets quickly once applied using hot-melt process'
        },
        {
          icon: Award,
          title: 'Skid-Resistant',
          description: 'Textured surface provides better traction for vehicles'
        },
        {
          icon: TrendingUp,
          title: 'Long Lifespan',
          description: 'Lasts 2-5+ years depending on traffic volume'
        },
        {
          icon: Sun,
          title: 'UV Resistant',
          description: 'Maintains vibrant yellow color without fading'
        }
      ],
      specifications: [
        { label: 'Color', value: 'Bright High-Visibility Yellow' },
        { label: 'Material', value: 'Thermoplastic (Pre-formed solid)' },
        { label: 'Compliance', value: 'ASTM Standards' },
        { label: 'Application Temp', value: '180–220°C (356–428°F)' },
        { label: 'Thickness', value: '3–5 mm' },
        { label: 'Lifespan', value: '2–5+ years' },
        { label: 'Reflectivity', value: '15-30% (with glass beads)' },
        { label: 'Drying Time', value: 'Sets upon cooling' }
      ],
      applications: [
        'Lane dividers and center lines',
        'No-passing zones',
        'Pedestrian crosswalks',
        'School zones',
        'Parking lot markings',
        'Construction zones'
      ]
    },
    white: {
      name: 'White Thermoplastic Road Marking Paint',
      color: '#FFFFFF',
      tagline: 'Premium Durable Road Marking Solution',
      image: '/images/products/white-thermoplastic-paint.svg',
      description: 'High-performance white thermoplastic paint for creating long-lasting, highly visible lines and symbols on roads, parking lots, airports, and paved surfaces.',
      features: [
        {
          icon: Shield,
          title: 'Exceptional Durability',
          description: 'Resistant to heavy traffic, UV rays, weathering, and abrasion'
        },
        {
          icon: Star,
          title: 'High Reflectivity',
          description: 'Contains glass beads (premixed or drop-on) for excellent nighttime visibility'
        },
        {
          icon: Timer,
          title: 'Fast-Drying',
          description: 'Sets quickly upon cooling, minimizing road closure times'
        },
        {
          icon: Layers,
          title: 'Strong Adhesion',
          description: 'Bonds firmly to asphalt and concrete surfaces'
        },
        {
          icon: Sparkles,
          title: 'Environmentally Friendly',
          description: 'Low VOC content, compliant with road safety regulations'
        },
        {
          icon: Sun,
          title: 'Vibrant Color Retention',
          description: 'Bright white hue resists yellowing or fading over time'
        }
      ],
      specifications: [
        { label: 'Color', value: 'Vibrant White (TiO₂ pigment)' },
        { label: 'Material', value: 'Thermoplastic Resin (Hydrocarbon/Alkyd)' },
        { label: 'Application Temp', value: '180–220°C (356–428°F)' },
        { label: 'Thickness', value: '3–5 mm' },
        { label: 'Lifespan', value: '2–5+ years' },
        { label: 'Reflectivity', value: '15-30% enhancement' },
        { label: 'VOC Content', value: 'Low (Eco-friendly)' },
        { label: 'Adhesion', value: 'Strong to asphalt/concrete' }
      ],
      applications: [
        'Road lane markings (center lines)',
        'No-passing zones',
        'Pedestrian crossings',
        'Parking lot stripes',
        'Airport runways/taxiways',
        'Bike lanes',
        'Industrial safety lanes'
      ]
    }
  };

  const currentProduct = products[selectedProduct];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-400 to-cyan-500 dark:from-blue-700 dark:to-cyan-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Our <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Products</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Premium thermoplastic road marking solutions for maximum visibility and durability
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Product Selector */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex     rounded-2xl p-2 shadow-xl border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setSelectedProduct('yellow')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${selectedProduct === 'yellow'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/50'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              🟡 Yellow Thermoplastic
            </button>
            <button
              onClick={() => setSelectedProduct('white')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${selectedProduct === 'white'
                ? 'bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-600 dark:to-gray-700 text-gray-900 dark:text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              ⚪ White Thermoplastic
            </button>
          </div>
        </div>

        {/* Product Hero Card */}
        <div className=" /80  /80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className={`w-full h-80 rounded-2xl flex items-center justify-center ${selectedProduct === 'yellow'
                ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30'
                : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800'
                }`}>
                <div className={`w-32 h-32 rounded-full ${selectedProduct === 'yellow'
                  ? 'bg-yellow-400 border-8 border-yellow-600'
                  : '  border-8 border-gray-400'
                  } shadow-2xl`}></div>
              </div>
              {/* Color Badge */}
              <div className="absolute top-4 right-4     rounded-xl px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: currentProduct.color }}
                  ></div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {selectedProduct === 'yellow' ? 'Yellow' : 'White'}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {currentProduct.name}
              </h2>
              <p className={`text-xl font-semibold mb-6 ${selectedProduct === 'yellow'
                ? 'text-yellow-600 dark:text-yellow-400'
                : 'text-gray-600 dark:text-gray-400'
                }`}>
                {currentProduct.tagline}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {currentProduct.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">2-5+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Lifespan</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">3-5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">mm Thickness</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">What makes our thermoplastic paint superior</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProduct.features.map((feature, index) => (
              <div
                key={index}
                className="group     rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg ${selectedProduct === 'yellow'
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-yellow-500/30'
                  : 'bg-gradient-to-br from-blue-400 to-cyan-500 shadow-cyan-500/30'
                  }`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-blue-200/50 dark:border-gray-700/50">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Technical Specifications</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">Detailed product specifications and standards</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentProduct.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="    rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{spec.label}</div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="mb-16">
          <div className=" /80  /80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Common Applications</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">Where our thermoplastic paint is used</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentProduct.applications.map((application, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                >
                  <CheckCircle2 className={`w-6 h-6 flex-shrink-0 mt-0.5 ${selectedProduct === 'yellow'
                    ? 'text-yellow-500'
                    : 'text-cyan-500'
                    }`} />
                  <span className="text-gray-700 dark:text-gray-300">{application}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-800 dark:to-cyan-800 rounded-3xl p-8 md:p-12 shadow-2xl text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Advantages Over Traditional Paint</h2>
              <p className="text-lg text-gray-100">Why thermoplastic is the superior choice</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16  /20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Drying Time</h3>
                <p className="text-gray-100">Hardens as it cools - roads reopen faster</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16  /20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Thicker Application</h3>
                <p className="text-gray-100">3–5 mm thickness for extended wear resistance</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16  /20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
                <p className="text-gray-100">Low VOC content, no harmful solvents</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className=" /80  /80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Order?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Contact us today for pricing, samples, or technical specifications. Our team is ready to help you choose the perfect solution for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-400 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4   dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg border-2 border-gray-300 dark:border-gray-600 hover:border-cyan-500 dark:hover:border-cyan-500 transform hover:scale-105 transition-all duration-300"
              >
                <span>Request Sample</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;