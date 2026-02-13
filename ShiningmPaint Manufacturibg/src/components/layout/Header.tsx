import { useState } from 'react';
import type { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { COMPANY_INFO, NAVIGATION_ITEMS } from '../../utils/constants';
import ThemeToggle from '../common/ThemeToggle';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-50  /30 dark:bg-gray-900/30 backdrop-blur-xl border-b border-white/20 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center py-3">
          {/* Logo and Company Name */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <img
                src="/images/logo.png"
                alt="Shinning Paint Logo"
                className="h-12 w-auto object-contain transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <h1 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent font-serif tracking-tight">
                  {COMPANY_INFO.name}
                </h1>
                <p className="hidden sm:block text-[10px] lg:text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">
                  {COMPANY_INFO.tagline}
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-grow space-x-1">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActiveRoute(item.href)
                  ? 'text-white bg-gradient-to-r from-blue-400 to-cyan-500 shadow-md shadow-cyan-500/30'
                  : 'text-gray-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Theme Toggle */}
            <div className="ml-2">
              <ThemeToggle />
            </div>

            {/* CTA Button */}
            <div className="ml-3">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white text-sm font-semibold rounded-lg shadow-md shadow-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-200"
              >
                <span>Get Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>

          {/* Tablet/Mobile Actions */}
          <div className="flex items-center space-x-2 lg:hidden">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover: /40 dark:hover:bg-gray-800/40 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden animate-slide-up border-t border-white/20 dark:border-gray-700/50">
            <div className="px-2 py-4 space-y-1  /20 dark:bg-gray-900/20 backdrop-blur-sm">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${isActiveRoute(item.href)
                    ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md'
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Theme Toggle */}
              <div className="md:hidden pt-2 border-t border-white/20 dark:border-gray-700/50 mt-2">
                <div className="px-4 py-2">
                  <ThemeToggle />
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Get Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
