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

async function debugUpdate() {
    try {
        console.log('Logging in...');
        const loginRes = await request('/auth/login', 'POST', {
            email: 'admin@ Shinningpaint.com',
            password: 'admin123'
        });
        const token = loginRes.body.token;

        // 1. Create
        console.log('Creating Job...');
        const createRes = await request('/careers', 'POST', {
            title: "Debug Update Job",
            department: "Engineering",
            description: "Initial",
            application_start_date: "2025-01-01",
            application_deadline: "2025-01-31"
        }, token);
        const jobId = createRes.body.data.id;
        console.log('Created ID:', jobId);

        // 2. Update
        console.log('Updating Job...');
        const updateRes = await request(`/careers/${jobId}`, 'PUT', {
            title: "Debug Update Job (Updated)",
            department: "Engineering",
            description: "Updated",
            application_start_date: "2025-02-01",
            application_start_date: "2025-02-01", // Duplicate key in obj literal warning? No.
            application_deadline: "2025-02-28"
        }, token);
        console.log('Update Result:', updateRes.body);

        // 3. Verify
        const getRes = await request(`/careers/${jobId}`, 'GET');
        console.log('Final Job Data:', JSON.stringify(getRes.body.data, null, 2));

    } catch (e) {
        console.error('Error:', e);
    }
}

debugUpdate();
