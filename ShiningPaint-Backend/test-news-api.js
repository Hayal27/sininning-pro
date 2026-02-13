require('dotenv').config();
const http = require('http');

async function testNewsAPI() {
    return new Promise((resolve, reject) => {
        console.log('🧪 Testing News API...\n');

        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/news',
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    console.log(`✅ Status: ${res.statusCode}`);
                    console.log(`📰 Found ${response.data.length} news articles\n`);

                    if (response.data.length > 0) {
                        const firstNews = response.data[0];
                        console.log('First article details:');
                        console.log(`   📝 Title: "${firstNews.title}"`);
                        console.log(`   🖼️  Images: ${firstNews.images ? firstNews.images.length : 0}`);
                        console.log(`   📂 Category: ${firstNews.category || 'N/A'}`);
                        console.log(`   📄 Summary: ${firstNews.summary ? 'Yes' : 'No'}`);
                        console.log(`   👤 Author: ${firstNews.author || 'N/A'}`);
                    }

                    console.log('\n✅ All tests passed!');
                    console.log('\n📌 Next steps:');
                    console.log('   1. Visit the News page on your website');
                    console.log('   2. Login to admin dashboard to manage news');
                    console.log('   3. Upload multiple images when creating news');

                    resolve();
                } catch (error) {
                    console.error('❌ Failed to parse response:', error.message);
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            console.error('❌ Request failed:', error.message);
            reject(error);
        });

        req.end();
    });
}

testNewsAPI().catch(console.error);
