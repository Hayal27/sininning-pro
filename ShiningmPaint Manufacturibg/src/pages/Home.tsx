import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Users, Factory, ShoppingCart, Star, CheckCircle2, Sparkles, Layers, Clock, Calendar, User as UserIcon, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { COMPANY_INFO, SOCIAL_LINKS } from '../utils/constants';
import { settingsService } from '../services/settings';
import { productsService, type Product } from '../services/products';
import { formatCurrency } from '../utils/format';
import { heroService } from '../services/hero';
import { apiService, API_BASE_URL } from '../services/api';
import type { HeroSection } from '../types/index';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  images: string[];
  category: string;
  author: string;
  published_at: string;
}

const Home: FC = () => {
  const [heroSection, setHeroSection] = useState<HeroSection | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedProducts, setExpandedProducts] = useState<Set<number>>(new Set());
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});

  const featuresRef = useRef<HTMLElement>(null);
  const productsPreviewRef = useRef<HTMLElement>(null);
  const featuredProductsRef = useRef<HTMLElement>(null);
  const latestNewsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Hero background images - road painting and road paint colors (local images)
  // Hero background images - fetch from DB or use default
  const defaultHeroImages = [
    '/images/hero/1.jpg',
    '/images/hero/2.jpg',
    '/images/hero/3.jpg',
    '/images/hero/4.jpg',
    '/images/hero/5.jpg',
    '/images/hero/6.jpg',
    '/images/hero/7.jpg',
  ];


  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('uploads/') || path.startsWith('/uploads/')) {
      // Use environment variable for API URL or hardcoded fallback
      const baseUrl = import.meta.env.VITE_API_URL || 'https://api.shinningpaint.startechaigroup.com/api';
      // Remove /api and append path
      return `${baseUrl.replace(/\/api$/, '')}/${path.replace(/^\//, '')}`;
    }
    return path;
  };

  const heroImages = heroSection?.images && heroSection.images.length > 0
    ? heroSection.images.map(getImageUrl)
    : defaultHeroImages;

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

  // Fetch Hero Section
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await heroService.getActiveHero();
        // Parse images if they come as string (though backend usually handles it, verify in browser)
        if (typeof data.images === 'string') {
          try {
            data.images = JSON.parse(data.images);
          } catch (e) {
            console.error('Failed to parse hero images JSON', e);
            data.images = [];
          }
        }
        setHeroSection(data);
      } catch (error) {
        console.error('Failed to fetch hero section:', error);
      }
    };

    fetchHero();
  }, []);

  // Fetch Latest News
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response: any = await apiService.get('/news?limit=3');
        if (response && response.success) {
          setLatestNews(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch latest news:', error);
      }
    };

    fetchLatestNews();
  }, []);

  // Fetch Social Links
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsService.getSettings();
        if (response.success) {
          setSocialLinks(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };
    fetchSettings();
  }, []);

  // Track mouse movement for interactive dots
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-slide hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setVisibleSections((prev) => new Set(prev).add(sectionId));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = [
      featuresRef.current,
      productsPreviewRef.current,
      featuredProductsRef.current,
      latestNewsRef.current,
      ctaRef.current
    ];

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Social Sidebar Scroll Logic
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({ position: 'fixed', top: '50%', transform: 'translateY(-50%)' });
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer || !sidebarRef.current) return;

      const footerRect = footer.getBoundingClientRect();
      const sidebarHeight = sidebarRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Distance from top of viewport to top of footer
      const footerTop = footerRect.top;

      // Calculate where the sidebar bottom would be if it were centered in the viewport
      const sidebarBottomIfFixed = (windowHeight / 2) + (sidebarHeight / 2);

      // If the footer is coming up and would overlap with the sidebar
      // We want the sidebar to stop moving down essentially.
      // But a fixed element moves with the viewport. So if we scroll down, the footer moves UP relative to viewport.
      // If footerTop < sidebarBottomIfFixed, collision.

      if (footerTop < sidebarBottomIfFixed + 40) { // 40px buffer
        // Switch to absolute positioning relative to the document or a container?
        // Actually, just pushing it up is easier with fixed positioning by adjusting top.
        // New top should be such that bottom of sidebar is at footerTop - buffer.
        // top + height = footerTop - buffer => top = footerTop - buffer - height

        setSidebarStyle({
          position: 'fixed',
          top: `${footerTop - 40 - sidebarHeight}px`,
          transform: 'none' // Remove the translateY(-50%)
        });
      } else {
        // Reset to default fixed centered
        setSidebarStyle({
          position: 'fixed',
          top: '50%',
          transform: 'translateY(-50%)'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Social Links Sidebar */}
      <div
        ref={sidebarRef}
        style={sidebarStyle}
        className="left-6 z-40 hidden lg:flex flex-col space-y-6 transition-all duration-300 ease-out"
      >
        <a
          href={socialLinks.social_linkedin || SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative animate-fade-in-left"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="w-12 h-12 bg-blue-700/80 backdrop-blur-md rounded-xl flex items-center justify-center text-white shadow-lg border border-white/20 hover:bg-blue-600 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-glow animate-float">
            <Linkedin className="w-6 h-6" />
          </div>
          <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-blue-900/90 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-blue-500/30">
            LinkedIn
          </span>
        </a>
        <a
          href={socialLinks.social_twitter || SOCIAL_LINKS.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative animate-fade-in-left"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="w-12 h-12 bg-sky-600/80 backdrop-blur-md rounded-xl flex items-center justify-center text-white shadow-lg border border-white/20 hover:bg-sky-500 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-glow animate-float" style={{ animationDelay: '1s' }}>
            <Twitter className="w-6 h-6" />
          </div>
          <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-sky-900/90 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-sky-500/30">
            Twitter
          </span>
        </a>
        <a
          href={socialLinks.social_facebook || SOCIAL_LINKS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative animate-fade-in-left"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="w-12 h-12 bg-blue-800/80 backdrop-blur-md rounded-xl flex items-center justify-center text-white shadow-lg border border-white/20 hover:bg-blue-700 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-glow animate-float" style={{ animationDelay: '2s' }}>
            <Facebook className="w-6 h-6" />
          </div>
          <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-blue-950/90 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-blue-600/30">
            Facebook
          </span>
        </a>
        <a
          href={socialLinks.social_instagram || SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative animate-fade-in-left"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600/80 to-pink-600/80 backdrop-blur-md rounded-xl flex items-center justify-center text-white shadow-lg border border-white/20 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-glow animate-float" style={{ animationDelay: '3s' }}>
            <Instagram className="w-6 h-6" />
          </div>
          <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-purple-900/90 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-pink-500/30">
            Instagram
          </span>
        </a>
      </div>
      {/* Hero Section */}
      <section className="relative hero-gradient text-white py-32 overflow-hidden">
        <div className="hero-overlay"></div>

        {/* Hero Background Image Slider */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-50' : 'opacity-0'
                }`}
            >
              <img
                src={image}
                alt={`Paint manufacturing ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/10 to-blue-900/20"></div>
            </div>
          ))}

          {/* Slider Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                  ? '  w-8'
                  : ' /50 hover: /75'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 dark:bg-blue-400/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 dark:bg-purple-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64  /10 dark: /5 rounded-full blur-2xl animate-pulse-slow"></div>

          {/* Magical Sparkles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2   rounded-full animate-pulse"
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
              <span className="inline-block px-6 py-2  /10 backdrop-blur-sm rounded-full text-sm font-semibold tracking-wider uppercase border border-white/20">
                Since 1985 • Premium Quality
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight overflow-hidden">
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-[typewriter_1.5s_steps(40,end)] border-r-4 border-r-yellow-400 pr-2 inline-block whitespace-nowrap overflow-hidden">
                {(heroSection?.title || COMPANY_INFO.tagline).split(' ')[0]}
              </span>
              <span className="block animate-[typewriter_2s_steps(40,end)_1.5s_both] border-r-4 border-r-white pr-2 inline-block whitespace-nowrap overflow-hidden">
                {(heroSection?.title || COMPANY_INFO.tagline).split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-200 font-light animate-[fadeIn_1s_ease-in_3.5s_both]">
              {heroSection?.subtitle || COMPANY_INFO.description}
            </p>

            <style>{`
              @keyframes typewriter {
                from {
                  width: 0;
                }
                to {
                  width: 100%;
                }
              }
              
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              
              @keyframes blink {
                50% {
                  border-color: transparent;
                }
              }
            `}</style>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to={heroSection?.cta_primary_link || "/products"} className="group">
                <Button size="lg" className="  text-gray-900 hover:bg-gray-100 shadow-2xl text-lg px-12 py-4">
                  <span>{heroSection?.cta_primary_text || "Explore Products"}</span>
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to={heroSection?.cta_secondary_link || "/contact"} className="group">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:  hover:text-gray-900 text-lg px-12 py-4">
                  <span>{heroSection?.cta_secondary_text || "Get Quote"}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        data-section="features"
        className={`section-divider py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden transition-all duration-[1800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${visibleSections.has('features') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-32 scale-90'
          }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Interactive Animated Dots - Follow Mouse */}
        {[...Array(20)].map((_, i) => {
          const delay = i * 0.1;
          const offsetX = (mousePosition.x / window.innerWidth) * 50 - 25;
          const offsetY = (mousePosition.y / window.innerHeight) * 50 - 25;

          return (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full pointer-events-none transition-all duration-1000 ease-out"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${((i * 7) % 100)}%`,
                background: `radial-gradient(circle, ${['rgba(59, 130, 246, 0.6)', 'rgba(168, 85, 247, 0.6)', 'rgba(236, 72, 153, 0.6)', 'rgba(251, 191, 36, 0.6)'][i % 4]
                  }, transparent)`,
                transform: `translate(${offsetX * (i % 3)}px, ${offsetY * (i % 3)}px) scale(${1 + Math.sin(Date.now() / 1000 + i) * 0.3})`,
                boxShadow: `0 0 20px ${['rgba(59, 130, 246, 0.8)', 'rgba(168, 85, 247, 0.8)', 'rgba(236, 72, 153, 0.8)', 'rgba(251, 191, 36, 0.8)'][i % 4]
                  }`,
                animation: `float ${4 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-8">
              Why Choose <span className="text-gradient">ShinningPaint</span>?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              With over <span className="text-gradient font-bold">{new Date().getFullYear() - COMPANY_INFO.founded} years</span> of experience, we deliver superior quality and innovation in every product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quality Assurance Card - Blue Glass */}
            <div className={`text-center group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/15 via-blue-400/10 to-blue-300/5 backdrop-blur-xl border border-blue-400/30 p-8 shadow-xl hover:shadow-2xl transition-all duration-[1500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:-translate-y-2 ${visibleSections.has('features') ? 'opacity-100 translate-y-0 rotate-0 scale-100' : 'opacity-0 translate-y-40 -rotate-6 scale-90'
              }`} style={{ transitionDelay: '200ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-500/70 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-blue-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500 mx-auto w-20 h-20"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Quality Assurance</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Rigorous testing and quality control ensure every product meets the highest international standards.
                </p>
              </div>
            </div>

            {/* Industry Leading Card - Purple Glass */}
            <div className={`text-center group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/15 via-purple-400/10 to-purple-300/5 backdrop-blur-xl border border-purple-400/30 p-8 shadow-xl hover:shadow-2xl transition-all duration-[1500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:-translate-y-2 ${visibleSections.has('features') ? 'opacity-100 translate-y-0 rotate-0 scale-100' : 'opacity-0 translate-y-48 rotate-6 scale-90'
              }`} style={{ transitionDelay: '400ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/50 group-hover:shadow-xl group-hover:shadow-purple-500/70 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-purple-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500 mx-auto w-20 h-20"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Industry Leading</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Award-winning formulations and innovative solutions for diverse industrial applications.
                </p>
              </div>
            </div>

            {/* Expert Team Card - Cyan Glass */}
            <div className={`text-center group relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/15 via-cyan-400/10 to-cyan-300/5 backdrop-blur-xl border border-cyan-400/30 p-8 shadow-xl hover:shadow-2xl transition-all duration-[1500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:-translate-y-2 ${visibleSections.has('features') ? 'opacity-100 translate-y-0 rotate-0 scale-100' : 'opacity-0 translate-y-56 -rotate-5 scale-90'
              }`} style={{ transitionDelay: '600ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/50 group-hover:shadow-xl group-hover:shadow-cyan-500/70 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-cyan-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500 mx-auto w-20 h-20"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">Expert Team</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  <span className="font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{COMPANY_INFO.employees}</span> skilled professionals dedicated to excellence and innovation.
                </p>
              </div>
            </div>

            {/* Advanced Manufacturing Card - Orange Glass */}
            <div className={`text-center group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/15 via-orange-400/10 to-orange-300/5 backdrop-blur-xl border border-orange-400/30 p-8 shadow-xl hover:shadow-2xl transition-all duration-[1500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:-translate-y-2 ${visibleSections.has('features') ? 'opacity-100 translate-y-0 rotate-0 scale-100' : 'opacity-0 translate-y-64 rotate-5 scale-90'
              }`} style={{ transitionDelay: '800ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/50 group-hover:shadow-xl group-hover:shadow-orange-500/70 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                    <Factory className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-orange-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500 mx-auto w-20 h-20"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">Advanced Manufacturing</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  State-of-the-art facilities with cutting-edge technology and sustainable practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section
        ref={productsPreviewRef}
        data-section="products-preview"
        className={`py-24 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-all duration-[1500ms] ease-out ${visibleSections.has('products-preview') ? 'opacity-100' : 'opacity-0'
          }`}
      >
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-8">
              Our <span className="text-gradient">Product Range</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions for all your coating needs with premium quality and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card
              className={`group hover:scale-105 transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${visibleSections.has('products-preview') ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-20 scale-90 blur-sm'
                }`}
              shadow="xl"
            >
              <div className="relative h-64 rounded-2xl mb-6 overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <img
                  src="/images/products/industrial-paints.svg"
                  alt="Industrial Paints"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Factory className="w-8 h-8 mb-2" />
                  <span className="text-sm font-semibold">Heavy Duty</span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Industrial Paints</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Heavy-duty coatings for industrial applications, machinery, and infrastructure with superior durability.
              </p>
              <Link to="/products/industrial" className="group/link">
                <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </Card>

            <Card
              className={`group hover:scale-105 transition-all duration-[1200ms] delay-[200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${visibleSections.has('products-preview') ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-20 scale-90 blur-sm'
                }`}
              shadow="xl"
            >
              <div className="relative h-64 rounded-2xl mb-6 overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <img
                  src="/images/products/architectural-coatings.svg"
                  alt="Architectural Coatings"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Users className="w-8 h-8 mb-2" />
                  <span className="text-sm font-semibold">Premium</span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Architectural Coatings</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Premium paints for residential and commercial buildings with lasting beauty and protection.
              </p>
              <Link to="/products/architectural" className="group/link">
                <Button variant="outline" size="sm" className="w-full group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </Card>

            <Card
              className={`group hover:scale-105 transition-all duration-[1200ms] delay-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${visibleSections.has('products-preview') ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-20 scale-90 blur-sm'
                }`}
              shadow="xl"
            >
              <div className="relative h-64 rounded-2xl mb-6 overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                <img
                  src="/images/products/specialty-finishes.svg"
                  alt="Specialty Finishes"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Award className="w-8 h-8 mb-2" />
                  <span className="text-sm font-semibold">Custom</span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-emerald-300 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">Specialty Finishes</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
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

          <div className="mt-20 text-center">
            <Link to="/products" className="group">
              <Button size="lg" className="bg-gradient-secondary text-white hover:shadow-2xl text-lg px-12 py-4">
                <span>Explore All Products</span>
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Thermoplastic Products Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-semibold tracking-wider uppercase shadow-glow">
                Premium Thermoplastic Solutions
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-8">
              Road Marking <span className="text-gradient">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              High-visibility thermoplastic paints engineered for maximum durability and safety
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Yellow Thermoplastic Card */}
            <Card className="group hover:scale-105 transition-all duration-500 overflow-hidden" shadow="xl">
              <div className="relative h-80 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFC107' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}></div>
                </div>
                <div className="relative z-10 text-center">
                  <div className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl shadow-yellow-500/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-6xl">🟡</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Yellow Thermoplastic</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-4">
                  Bright, High-Visibility Safety Solution
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  ASTM-compliant bright yellow thermoplastic paint designed for maximum visibility and durability in high-traffic zones.
                </p>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Exceptional Durability & UV Resistant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Reflective Technology with Glass Beads</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Fast-Drying & Skid-Resistant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">2-5+ Years Lifespan</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Application Temp</div>
                    <div className="font-bold text-gray-900 dark:text-white">180–220°C</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Thickness</div>
                    <div className="font-bold text-gray-900 dark:text-white">3–5 mm</div>
                  </div>
                </div>

                <Link to="/products" className="group/link">
                  <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:shadow-lg hover:shadow-yellow-500/50">
                    <span>View Details</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* White Thermoplastic Card */}
            <Card className="group hover:scale-105 transition-all duration-500 overflow-hidden" shadow="xl">
              <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}></div>
                </div>
                <div className="relative z-10 text-center">
                  <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full shadow-2xl shadow-gray-500/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border-4 border-gray-400 dark:border-gray-500">
                    <span className="text-6xl">⚪</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">White Thermoplastic</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-4">
                  Premium Durable Road Marking Solution
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  High-performance white thermoplastic paint for creating long-lasting, highly visible lines and symbols on roads, parking lots, and paved surfaces.
                </p>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Exceptional Durability & Weather Resistant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">High Reflectivity with Glass Beads</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Fast-Drying & Strong Adhesion</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Eco-Friendly & Low VOC</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-3 border border-cyan-200 dark:border-cyan-800">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Application Temp</div>
                    <div className="font-bold text-gray-900 dark:text-white">180–220°C</div>
                  </div>
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-3 border border-cyan-200 dark:border-cyan-800">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Thickness</div>
                    <div className="font-bold text-gray-900 dark:text-white">3–5 mm</div>
                  </div>
                </div>

                <Link to="/products" className="group/link">
                  <Button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50">
                    <span>View Details</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-800 dark:to-cyan-800 rounded-3xl p-8 md:p-12 text-white">
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
        </div>
      </section>

      {/* Featured Products Section */}
      <section
        ref={featuredProductsRef}
        data-section="featured-products"
        className={`py-24   dark:bg-gray-900 transition-all duration-[1800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${visibleSections.has('featured-products') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-32 scale-92'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-primary text-white rounded-full text-sm font-semibold tracking-wider uppercase shadow-glow">
                Featured Products
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-8">
              Our <span className="text-gradient">Best Products</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our most popular products trusted by professionals
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
              {featuredProducts.map((product) => {
                const isExpanded = expandedProducts.has(product.id);
                const toggleExpanded = () => {
                  setExpandedProducts(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(product.id)) {
                      newSet.delete(product.id);
                    } else {
                      newSet.add(product.id);
                    }
                    return newSet;
                  });
                };

                return (
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

                      {/* Prominent Color Badge */}
                      {product.color_code && (
                        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-xl border border-gray-200">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-8 h-8 rounded-full border-3 border-white shadow-lg ring-2 ring-gray-300"
                                style={{ backgroundColor: product.color_code }}
                              ></div>
                              <div className="text-left">
                                <div className="text-xs text-gray-500 font-medium">Color</div>
                                <div className="text-xs font-bold text-gray-900 font-mono">{product.color_code}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
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
                        <span className={`text-sm px-2 py-1 rounded-full ${product.stock_quantity > product.min_stock_level
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>

                      {/* Expandable Details Section */}
                      <div className="border-t border-gray-200 pt-4">
                        <button
                          onClick={toggleExpanded}
                          className="w-full flex items-center justify-between text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          <span className="text-sm">Product Details</span>
                          <svg
                            className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                          <div className="space-y-3 text-sm">
                            {product.finish_type && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">Finish:</span>
                                <span className="font-semibold text-gray-900">{product.finish_type}</span>
                              </div>
                            )}
                            {product.coverage_area && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">Coverage:</span>
                                <span className="font-semibold text-gray-900">{product.coverage_area} sq ft</span>
                              </div>
                            )}
                            {product.drying_time && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">Drying Time:</span>
                                <span className="font-semibold text-gray-900">{product.drying_time}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-500">Stock:</span>
                              <span className="font-semibold text-gray-900">{product.stock_quantity} {product.unit}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Min Level:</span>
                              <span className="font-semibold text-gray-900">{product.min_stock_level} {product.unit}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
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

      {/* Latest Updates Section */}
      <section
        ref={latestNewsRef}
        data-section="latest-news"
        className={`py-24 bg-white dark:bg-gray-900 transition-all duration-[1800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${visibleSections.has('latest-news') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-32 scale-95'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="mb-6">
                <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-semibold tracking-wider uppercase shadow-glow">
                  Latest Updates
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                News & <span className="text-gradient">Innovations</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Stay updated with the latest trends, news, and breakthroughs from  ShinningPaint.
              </p>
            </div>
            <Link to="/news" className="group">
              <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <span>See All News</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {latestNews.length > 0 ? (
              latestNews.map((item, index) => {
                let images: string[] = [];
                try {
                  images = typeof item.images === 'string' ? JSON.parse(item.images) : (Array.isArray(item.images) ? item.images : []);
                } catch (e) {
                  images = [];
                }

                const imageUrl = images.length > 0
                  ? (images[0].startsWith('http') ? images[0] : `${API_BASE_URL.replace(/\/api$/, '')}${images[0]}`)
                  : 'https://placehold.co/800x600/1e40af/ffffff?text=Shinning+Paint+News';

                return (
                  <div
                    key={item.id}
                    className="group relative h-[500px] overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 hover:-translate-y-4"
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {/* Background Image */}
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <div className="flex items-center gap-3 mb-4 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" style={{ transitionDelay: '100ms' }}>
                        <span className="bg-blue-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                          {item.category || 'Update'}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-blue-200">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-4 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-gray-300 text-sm line-clamp-2 mb-6 transform translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" style={{ transitionDelay: '200ms' }}>
                        {item.summary || item.content}
                      </p>

                      <div className="flex items-center justify-between transform translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" style={{ transitionDelay: '300ms' }}>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border border-white/20">
                            <UserIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xs font-medium text-gray-300">{item.author || 'Admin'}</span>
                        </div>
                        <Link
                          to={`/news?id=${item.id}`}
                          className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-white transition-colors group/read"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 transform group-hover/read:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Decorative Border */}
                    <div className="absolute inset-4 border border-white/10 rounded-2xl pointer-events-none transition-all duration-500 group-hover:inset-3 group-hover:border-white/30"></div>
                  </div>
                );
              })
            ) : (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-[500px] rounded-3xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        data-section="cta"
        className={`relative py-32 hero-gradient text-white overflow-hidden transition-all duration-[2000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${visibleSections.has('cta') ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-85 rotate-2'
          }`}
      >
        <div className="hero-overlay"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64  /10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="mb-8">
              <span className="inline-block px-8 py-3  /10 backdrop-blur-sm rounded-full text-lg font-semibold tracking-wider uppercase border border-white/20">
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
                <Button size="lg" className="  text-gray-900 hover:bg-gray-100 shadow-2xl text-lg px-12 py-4">
                  <span>Get Started Today</span>
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/products" className="group">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:  hover:text-gray-900 text-lg px-12 py-4">
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
