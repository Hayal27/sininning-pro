require('dotenv').config();
const http = require('http');

// Get token first (you'll need to update this with a valid admin token)
const testData = JSON.stringify({
    title: 'Test News Article',
    summary: 'This is a test summary',
    content: 'This is the full content of the test news article.',
    category: 'general',
    author: 'Test Admin',
    is_published: true
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/news',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': testData.length,
        // You'll need to add a valid token here
        // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
};

console.log('🧪 Testing news creation without images...\n');
console.log('Request data:', JSON.parse(testData));

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`\n📡 Response status: ${res.statusCode}`);
        try {
            const response = JSON.parse(data);
            console.log('📄 Response:', JSON.stringify(response, null, 2));

            if (res.statusCode === 201) {
                console.log('\n✅ News created successfully!');
            } else {
                console.log('\n❌ Failed to create news');
            }
        } catch (error) {
            console.error('❌ Failed to parse response:', data);
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Request failed:', error.message);
});

req.write(testData);
req.end();
