import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "supersecretkey123";
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

interface User {
    email: string;
    password?: string;
}

function loadUsers(): User[] {
    const dir = path.dirname(USERS_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, "[]");
        return [];
    }
    const fileContent = fs.readFileSync(USERS_FILE, "utf8");
    try {
        return JSON.parse(fileContent);
    } catch {
        return [];
    }
}

function saveUsers(users: User[]) {
    // Ensure data dir exists
    const dir = path.dirname(USERS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function POST(req: Request) {
    try {
        console.log("Signup request received");
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password required" }, { status: 400 });
        }

        console.log("Loading users from:", USERS_FILE);
        const users = loadUsers();
        const userExists = users.find((u) => u.email === email);

        if (userExists) {
            return NextResponse.json({ message: "User already exists!" }, { status: 400 });
        }

        const newUser: User = { email, password };
        users.push(newUser);
        saveUsers(users);

        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
        return NextResponse.json({ message: "Signup successful", token });
    } catch (error: any) {
        console.error("Signup Error:", error);
        return NextResponse.json({
            message: "Internal Server Error",
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
