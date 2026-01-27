const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "supersecretkey123";
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

async function loadUsers() {
    try {
        const dir = path.dirname(USERS_FILE);
        await fs.mkdir(dir, { recursive: true });
        const fileContent = await fs.readFile(USERS_FILE, "utf8");
        return JSON.parse(fileContent);
    } catch (error) {
        console.log("loadUsers error (expected if file missing):", error.message);
        return [];
    }
}

async function saveUsers(users) {
    const dir = path.dirname(USERS_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function testSignup() {
    try {
        console.log("Testing signup logic...");
        const email = `test${Date.now()}@example.com`;
        const password = "password123";

        console.log("Loading users...");
        const users = await loadUsers();
        console.log(`Loaded ${users.length} users.`);

        const userExists = users.find((u) => u.email === email);
        if (userExists) {
            console.log("User already exists (unexpected for new email).");
            return;
        }

        const newUser = { email, password };
        users.push(newUser);

        console.log("Saving users...");
        await saveUsers(users);
        console.log("Users saved.");

        console.log("Signing token...");
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
        console.log("Token signed:", token ? "Success" : "Failure");

        console.log("Signup logic test passed!");
    } catch (error) {
        console.error("Signup logic failed:", error);
    }
}

testSignup();
