const http = require('http');

console.log("Starting API test...");

const data = JSON.stringify({
    email: "http_test_" + Date.now() + "@example.com",
    password: "password123"
});

const options = {
    hostname: 'localhost',
    port: 3002,
    path: '/api/signup',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let body = '';
    console.log('Status Code:', res.statusCode);
    res.setEncoding('utf8');
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('Response Body:', body);
    });
});

req.on('error', (e) => {
    console.error(`Request error: ${e.message}`);
});

req.write(data);
req.end();
console.log("Request sent.");
