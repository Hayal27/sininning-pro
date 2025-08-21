import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import NotificationContainer from '../components/NotificationContainer';
import { useUIStore } from '../store/uiStore';

const DashboardLayout: React.FC = () => {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className={`transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
      }`}>
        {/* Header */}
        <Header />
        
        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
      
      {/* Notifications */}
      <NotificationContainer />
    </div>
  );
};

export default DashboardLayout;
