const http = require('http');

const emailsToTest = [
    `test_${Date.now()}@gmail.com`,   // Standard new
    `test.foo+bar_${Date.now()}@gmail.com`, // With special chars
    "anura317@gmail.com", // Existing (should fail)
    "invalid-email",      // Invalid format (should fail validation)
];

function request(email) {
    return new Promise((resolve) => {
        const body = JSON.stringify({ email, password: "password123" });
        const req = http.request({
            hostname: 'localhost',
            port: 3000, // Running on 3000 now
            path: '/api/signup',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': body.length
            }
        }, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve({ status: res.statusCode, body: data }));
        });

        req.on('error', (e) => resolve({ error: e.message }));
        req.write(body);
        req.end();
    });
}

async function run() {
    console.log("Testing Signup scenarios...");
    for (const email of emailsToTest) {
        console.log(`\nTesting: ${email}`);
        const res = await request(email);
        console.log(`Result: ${JSON.stringify(res)}`);
    }
}

run();
