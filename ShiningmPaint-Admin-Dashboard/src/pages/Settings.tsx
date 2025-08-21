import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your application settings</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-soft p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Application Settings</h3>
        <p className="text-gray-500">This page will contain application settings and configuration.</p>
      </div>
    </div>
  );
};

export default Settings;
