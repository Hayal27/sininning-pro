const http = require('http');

function postRequest(path, data, token = null) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify(data);
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/api' + path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
        });

        req.on('error', (e) => reject(e));
        req.write(body);
        req.end();
    });
}

async function test() {
    try {
        console.log('1. Logging in...');
        const loginRes = await postRequest('/auth/login', {
            email: 'admin@ Shinningpaint.com',
            password: 'admin123'
        });

        if (loginRes.status !== 200) {
            console.error('Login failed:', loginRes.body);
            return;
        }

        const token = loginRes.body.token;
        console.log('Login successful, got token.');

        console.log('2. Creating Career with Dates...');
        const careerData = {
            title: "API Test Job",
            department: "Engineering",
            location: "Test Lab",
            type: "full-time",
            description: "Testing API date handling",
            requirements: "Node.js",
            application_start_date: "2025-05-01",
            application_deadline: "2025-05-31",
            is_active: true
        };

        const createRes = await postRequest('/careers', careerData, token);
        console.log('Create Response:', JSON.stringify(createRes.body, null, 2));

        if (createRes.body.success) {
            console.log('✅ Career created via API.');
            const createdJob = createRes.body.data;
            if (createdJob.application_start_date === "2025-05-01" && createdJob.application_deadline === "2025-05-31") {
                console.log('✅ Dates MATCH in response data.');
            } else {
                console.log('❌ Dates DO NOT MATCH in response data.');
                console.log('Sent:', careerData.application_start_date, careerData.application_deadline);
                console.log('Got:', createdJob.application_start_date, createdJob.application_deadline);
            }
        } else {
            console.log('❌ Create failed.');
        }

    } catch (e) {
        console.error('Test failed:', e);
    }
}

test();
