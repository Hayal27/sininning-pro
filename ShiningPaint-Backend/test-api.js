const axios = require('axios');

const API_BASE = 'https://api.shinningpaint.startechaigroup.com/api';

async function testAPI() {
  try {
    console.log('🧪 Testing  ShinningPaint Backend API...\n');

    // Test 1: Health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get('https://api.shinningpaint.startechaigroup.com/health');
    console.log('✅ Health check passed:', healthResponse.data.status);

    // Test 2: Login
    console.log('\n2. Testing login...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@ Shinningpaint.com',
      password: 'admin123'
    });
    console.log('✅ Login successful');
    console.log('   User:', loginResponse.data.user.first_name, loginResponse.data.user.last_name);
    console.log('   Role:', loginResponse.data.user.role);

    const token = loginResponse.data.token;

    // Test 3: Get current user
    console.log('\n3. Testing get current user...');
    const userResponse = await axios.get(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Get current user successful');
    console.log('   User ID:', userResponse.data.data.id);

    // Test 4: Dashboard stats
    console.log('\n4. Testing dashboard stats...');
    const statsResponse = await axios.get(`${API_BASE}/analytics/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Dashboard stats retrieved');
    console.log('   Total Revenue:', statsResponse.data.data.revenue.total);
    console.log('   Total Orders:', statsResponse.data.data.orders.total);
    console.log('   Total Customers:', statsResponse.data.data.customers.total);
    console.log('   Total Products:', statsResponse.data.data.products.total);

    // Test 5: Recent orders
    console.log('\n5. Testing recent orders...');
    const ordersResponse = await axios.get(`${API_BASE}/analytics/recent-orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Recent orders retrieved');
    console.log('   Orders count:', ordersResponse.data.data.length);

    // Test 6: Top products
    console.log('\n6. Testing top products...');
    const productsResponse = await axios.get(`${API_BASE}/analytics/top-products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Top products retrieved');
    console.log('   Products count:', productsResponse.data.data.length);

    // Test 7: Get all products
    console.log('\n7. Testing get all products...');
    const allProductsResponse = await axios.get(`${API_BASE}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ All products retrieved');
    console.log('   Products count:', allProductsResponse.data.data.length);

    // Test 8: Get all customers
    console.log('\n8. Testing get all customers...');
    const customersResponse = await axios.get(`${API_BASE}/customers`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ All customers retrieved');
    console.log('   Customers count:', customersResponse.data.data.length);

    console.log('\n🎉 All API tests passed successfully!');
    console.log('\n📊 Backend Summary:');
    console.log(`   - ${allProductsResponse.data.data.length} products in catalog`);
    console.log(`   - ${customersResponse.data.data.length} customers registered`);
    console.log(`   - $${statsResponse.data.data.revenue.total} total revenue`);
    console.log(`   - ${statsResponse.data.data.orders.total} total orders`);

  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

testAPI();
