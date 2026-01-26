const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

console.log("Checking path:", USERS_FILE);
const dir = path.dirname(USERS_FILE);

if (!fs.existsSync(dir)) {
    console.log("Dir missing, creating...");
    fs.mkdirSync(dir, { recursive: true });
} else {
    console.log("Dir exists.");
}

if (!fs.existsSync(USERS_FILE)) {
    console.log("File missing, creating...");
    fs.writeFileSync(USERS_FILE, "[]");
} else {
    console.log("File exists.");
    const content = fs.readFileSync(USERS_FILE, 'utf8');
    console.log("Content:", content);
}
