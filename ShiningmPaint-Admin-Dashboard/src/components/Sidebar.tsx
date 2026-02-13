import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChartBarIcon,
  Bars3Icon,
  InboxIcon,
  UserIcon,
  EnvelopeIcon,
  NewspaperIcon,
  BriefcaseIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, roles: ['owner', 'admin', 'content-manager', 'hr'], color: 'from-blue-500 to-blue-600', iconColor: 'text-blue-500', bgHover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20' },
  { name: 'Products', href: '/products', icon: ShoppingBagIcon, roles: ['owner', 'admin', 'content-manager'], color: 'from-purple-500 to-purple-600', iconColor: 'text-purple-500', bgHover: 'hover:bg-purple-50 dark:hover:bg-purple-900/20' },

  { name: 'Users', href: '/users', icon: UserIcon, roles: ['owner', 'admin'], color: 'from-cyan-500 to-cyan-600', iconColor: 'text-cyan-500', bgHover: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/20' },
  { name: 'Subscriptions', href: '/subscriptions', icon: EnvelopeIcon, roles: ['owner', 'admin', 'content-manager'], color: 'from-indigo-500 to-indigo-600', iconColor: 'text-indigo-500', bgHover: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20' },
  { name: 'News', href: '/news', icon: NewspaperIcon, roles: ['owner', 'admin', 'content-manager'], color: 'from-amber-500 to-amber-600', iconColor: 'text-amber-500', bgHover: 'hover:bg-amber-50 dark:hover:bg-amber-900/20' },
  { name: 'Careers', href: '/careers', icon: BriefcaseIcon, roles: ['owner', 'admin', 'hr'], color: 'from-teal-500 to-teal-600', iconColor: 'text-teal-500', bgHover: 'hover:bg-teal-50 dark:hover:bg-teal-900/20' },
  { name: 'Hero Section', href: '/hero', icon: HomeIcon, roles: ['owner', 'admin'], color: 'from-violet-500 to-violet-600', iconColor: 'text-violet-500', bgHover: 'hover:bg-violet-50 dark:hover:bg-violet-900/20' },
  { name: 'Messages', href: '/contact-submissions', icon: InboxIcon, roles: ['owner', 'admin', 'content-manager'], color: 'from-rose-500 to-rose-600', iconColor: 'text-rose-500', bgHover: 'hover:bg-rose-50 dark:hover:bg-rose-900/20' },
  { name: 'Orders', href: '/orders', icon: ClipboardDocumentListIcon, roles: ['owner', 'admin'], color: 'from-orange-500 to-orange-600', iconColor: 'text-orange-500', bgHover: 'hover:bg-orange-50 dark:hover:bg-orange-900/20' },
  { name: 'Customers', href: '/customers', icon: UserGroupIcon, roles: ['owner', 'admin'], color: 'from-green-500 to-green-600', iconColor: 'text-green-500', bgHover: 'hover:bg-green-50 dark:hover:bg-green-900/20' },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon, roles: ['owner', 'admin'], color: 'from-pink-500 to-pink-600', iconColor: 'text-pink-500', bgHover: 'hover:bg-pink-50 dark:hover:bg-pink-900/20' },
  { name: 'Company Info', href: '/company-info', icon: BuildingOfficeIcon, roles: ['owner', 'admin'], color: 'from-indigo-500 to-indigo-600', iconColor: 'text-indigo-500', bgHover: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20' },
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

  const filteredNavigation = navigation.filter(item => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role);
  });

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-[60] flex flex-col bg-surface shadow-xl transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'
          } lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } `}
      >
        {/* Logo and toggle */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <div className={`flex items-center ${sidebarOpen ? '' : 'justify-center w-full'}`}>
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-12 w-auto object-contain"
            />
            {sidebarOpen && (
              <div className="ml-3">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ShinningPaint
                </h1>
                <p className="text-xs text-text-secondary">Admin Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {filteredNavigation.map((item) => {
            const active = isActive(item.href);
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`group relative flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${active
                  ? `bg-gradient-to-r ${item.color} text-white shadow-md`
                  : `text-text-primary ${item.bgHover}`
                  } ${sidebarOpen ? '' : 'justify-center'}`}
                title={!sidebarOpen ? item.name : undefined}
              >
                {/* Icon with colored background when not active */}
                <div className={`flex-shrink-0 ${active ? '' : `p-1.5 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-10`}`}>
                  <item.icon
                    className={`h-5 w-5 ${active
                      ? 'text-white'
                      : `${item.iconColor} group-hover:scale-110 transition-transform`
                      }`}
                  />
                </div>
                {sidebarOpen && (
                  <span className={`ml-3 ${active ? 'font-semibold' : ''}`}>{item.name}</span>
                )}
                {/* Active indicator */}
                {active && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User info */}
        {sidebarOpen && user && (
          <div className="flex-shrink-0 border-t border-border p-4 bg-surface-hover">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-white">
                    {user.firstName?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-semibold text-text-primary truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-text-secondary truncate capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Collapse button for desktop */}
        <div className="hidden lg:block border-t border-border p-2">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
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
