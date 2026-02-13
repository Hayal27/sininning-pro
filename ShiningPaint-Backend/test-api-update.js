const http = require('http');

function request(path, method, data, token = null) {
    return new Promise((resolve, reject) => {
        const body = data ? JSON.stringify(data) : '';
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/api' + path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => responseData += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(responseData) }));
        });

        req.on('error', (e) => reject(e));
        if (data) req.write(body);
        req.end();
    });
}

async function testUpdate() {
    try {
        console.log('1. Logging in...');
        const loginRes = await request('/auth/login', 'POST', {
            email: 'admin@ Shinningpaint.com',
            password: 'admin123'
        });
        const token = loginRes.body.token;

        console.log('2. Creating Job for Update Test...');
        const createRes = await request('/careers', 'POST', {
            title: "Update Test Job",
            department: "Engineering",
            description: "To be updated",
            application_start_date: "2025-01-01",
            application_deadline: "2025-01-31"
        }, token);

        const jobId = createRes.body.data.id;
        console.log(`Job Created: ID ${jobId}`);

        console.log('3. Updating Job Dates...');
        const updateData = {
            title: "Update Test Job (Updated)",
            department: "Engineering",
            description: "Updated description",
            application_start_date: "2025-02-01",
            application_deadline: "2025-02-28"
        };

        const updateRes = await request(`/careers/${jobId}`, 'PUT', updateData, token);
        console.log('Update Response:', updateRes.body);

        console.log('4. Verifying Update...');
        const getRes = await request(`/careers/${jobId}`, 'GET'); // Public endpoint
        const updatedJob = getRes.body.data;

        console.log('Updated Job Data:', JSON.stringify({
            start: updatedJob.application_start_date,
            deadline: updatedJob.application_deadline
        }, null, 2));

        if (updatedJob.application_start_date.startsWith('2025-02-01') && updatedJob.application_deadline.startsWith('2025-02-28')) {
            console.log('✅ Update Successful!');
        } else {
            console.log('❌ Update FAILED!');
        }

    } catch (e) {
        console.error('Test failed:', e);
    }
}

testUpdate();
