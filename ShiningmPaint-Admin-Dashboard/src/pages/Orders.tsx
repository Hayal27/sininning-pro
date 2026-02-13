import React from 'react';

const Orders: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600">Manage customer orders and fulfillment</p>
      </div>

      <div className="  rounded-lg shadow-soft p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Order Management</h3>
        <p className="text-gray-500">This page will contain order management functionality.</p>
      </div>
    </div>
  );
};

export default Orders;
