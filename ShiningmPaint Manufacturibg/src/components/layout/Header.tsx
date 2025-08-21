import { useState } from 'react';
import type { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Palette, ArrowRight } from 'lucide-react';
import { COMPANY_INFO, NAVIGATION_ITEMS } from '../../utils/constants';
import ThemeToggle from '../common/ThemeToggle';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="nav-glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo and Company Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-glow-purple transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-all duration-500"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gradient font-serif tracking-tight">{COMPANY_INFO.name}</h1>
                <p className="text-sm text-gray-500 font-medium tracking-wider uppercase">{COMPANY_INFO.tagline}</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {NAVIGATION_ITEMS.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`nav-link flex items-center space-x-1 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        isActiveRoute(item.href)
                          ? 'text-white bg-gradient-primary shadow-glow'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-white/50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-56 card-glass rounded-2xl shadow-strong border border-white/20 py-2 animate-slide-up">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-white/20 hover:text-blue-600 transition-all duration-300 rounded-xl mx-2"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`nav-link px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActiveRoute(item.href)
                        ? 'text-white bg-gradient-primary shadow-glow'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-white/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Theme Toggle */}
            <div className="hidden md:block ml-4">
              <ThemeToggle />
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block ml-6">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Get Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-4 pt-4 pb-6 space-y-2 border-t border-white/20 bg-white/50 backdrop-blur-sm">
              {NAVIGATION_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-white/50 transition-all duration-300"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="pl-4 space-y-1 mt-2 animate-slide-up">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="block px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-white/30 transition-all duration-300"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                        isActiveRoute(item.href)
                          ? 'text-white bg-gradient-primary shadow-glow'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-white/50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
