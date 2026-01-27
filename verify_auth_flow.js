const http = require('http');

const EMAIL = `verify_${Date.now()}@example.com`;
const PASSWORD = "securePassword123";

function request(path, body) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const options = {
            hostname: 'localhost',
            port: 3002,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let responseBody = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                resolve({ status: res.statusCode, body: JSON.parse(responseBody || '{}') });
            });
        });

        req.on('error', (e) => reject(e));
        req.write(data);
        req.end();
    });
}

async function runTests() {
    console.log("Starting Auth Flow Verification...");

    // 1. Signup
    console.log(`\n1. Testing Signup (${EMAIL})...`);
    try {
        const signupRes = await request('/api/signup', { email: EMAIL, password: PASSWORD });
        console.log(`Status: ${signupRes.status}, Message: ${signupRes.body.message}`);
        if (signupRes.status === 200 && signupRes.body.token) {
            console.log("✅ Signup Successful");
        } else {
            console.error("❌ Signup Failed");
            process.exit(1);
        }
    } catch (e) {
        console.error("❌ Signup Request Error:", e.message);
        process.exit(1);
    }

    // 2. Login Success
    console.log(`\n2. Testing Login Success...`);
    try {
        const loginRes = await request('/api/login', { email: EMAIL, password: PASSWORD });
        console.log(`Status: ${loginRes.status}, Message: ${loginRes.body.message}`);
        if (loginRes.status === 200 && loginRes.body.token) {
            console.log("✅ Login Successful");
        } else {
            console.error("❌ Login Failed");
        }
    } catch (e) {
        console.error("❌ Login Request Error:", e.message);
    }

    // 3. Login Failure (Wrong Password)
    console.log(`\n3. Testing Login Failure (Wrong Password)...`);
    try {
        const failRes = await request('/api/login', { email: EMAIL, password: "wrongpassword" });
        console.log(`Status: ${failRes.status}, Message: ${failRes.body.message}`);
        if (failRes.status === 401) {
            console.log("✅ Login Validation Successful (Correctly rejected)");
        } else {
            console.error("❌ Login Validation Failed (Should have returned 401)");
        }
    } catch (e) {
        console.error("❌ Login Validation Request Error:", e.message);
    }

    // 4. Duplicate Signup
    console.log(`\n4. Testing Duplicate Signup...`);
    try {
        const dupRes = await request('/api/signup', { email: EMAIL, password: PASSWORD });
        console.log(`Status: ${dupRes.status}, Message: ${dupRes.body.message}`);
        if (dupRes.status === 400) {
            console.log("✅ Duplicate Signup Rejected Correctly");
        } else {
            console.error("❌ Duplicate Signup Check Failed");
        }
    } catch (e) {
        console.error("❌ Duplicate Signup Request Error:", e.message);
    }
}

runTests();
