const http = require('http');

const emails = [
    { email: `CaseSensitive_${Date.now()}@Gmail.Com`, desc: "Mixed Case User" },
    { email: `  spaced_user_${Date.now()}@gmail.com  `, desc: "User with Spacing" },
    { email: "anura317@gmail.com", desc: "Existing User (Should fail)" }
];

function request(email) {
    return new Promise((resolve) => {
        const body = JSON.stringify({ email, password: "password123" });
        const req = http.request({
            hostname: 'localhost',
            port: 3000,
            path: '/api/signup',
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Content-Length': body.length }
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
    console.log("Verifying Fixes...");
    for (const test of emails) {
        console.log(`\n--- Test: ${test.desc} ---`);
        console.log(`Input: "${test.email}"`);
        const res = await request(test.email);
        console.log(`Status: ${res.status}`);
        console.log(`Response: ${res.body.substring(0, 200)}`); // simple truncate if too long
    }
}

run();
