import React, { useState } from 'react';
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';
import { formatRelativeTime } from '../utils/format';

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { toggleSidebar } = useUIStore();
  const { user, logout } = useAuthStore();

  // Mock notifications - in real app, this would come from a store
  const notifications = [
    {
      id: '1',
      title: 'New Order',
      message: 'Order #12345 has been placed',
      time: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '2',
      title: 'Low Stock Alert',
      message: 'Product "Premium Paint" is running low',
      time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '3',
      title: 'Payment Received',
      message: 'Payment for order #12344 confirmed',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-400 hover:text-gray-500 relative"
            >
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {formatRelativeTime(notification.time)}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="text-sm text-primary-600 hover:text-primary-500">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <UserCircleIcon className="h-8 w-8" />
              <span className="hidden md:block text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
