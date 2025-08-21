import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">View detailed analytics and reports</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-soft p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
        <p className="text-gray-500">This page will contain analytics and reporting functionality.</p>
      </div>
    </div>
  );
};

export default Analytics;
