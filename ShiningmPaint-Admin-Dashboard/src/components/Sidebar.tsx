import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Products', href: '/products', icon: ShoppingBagIcon },
  { name: 'Orders', href: '/orders', icon: ClipboardDocumentListIcon },
  { name: 'Customers', href: '/customers', icon: UserGroupIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();
  const { user } = useAuthStore();

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-lg transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        } lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo and toggle */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          <div className={`flex items-center ${sidebarOpen ? '' : 'justify-center w-full'}`}>
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SP</span>
              </div>
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">
                  ShiningPaint
                </h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            )}
          </div>
          
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            {sidebarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  active
                    ? 'bg-primary-100 text-primary-900 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${sidebarOpen ? '' : 'justify-center'}`}
                title={!sidebarOpen ? item.name : undefined}
              >
                <item.icon
                  className={`flex-shrink-0 h-6 w-6 ${
                    active ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {sidebarOpen && (
                  <span className="ml-3">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User info */}
        {sidebarOpen && user && (
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {user.firstName?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Collapse button for desktop */}
        <div className="hidden lg:block border-t border-gray-200 p-2">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
