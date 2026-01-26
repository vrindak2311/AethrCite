import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "supersecretkey123";
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

interface User {
    email: string;
    password?: string;
}

async function loadUsers(): Promise<User[]> {
    try {
        const dir = path.dirname(USERS_FILE);
        // Check if directory exists, if not create it
        await fs.mkdir(dir, { recursive: true });

        // Check if file exists by trying to access it - or just try to read
        // If readFile throws NOENT, we return []
        const fileContent = await fs.readFile(USERS_FILE, "utf8");
        return JSON.parse(fileContent);
    } catch (error: any) {
        // If file not found (ENOENT) or JSON parse error, return empty array
        // We can log invalid JSON if needed, but for now robustly return []
        return [];
    }
}

async function saveUsers(users: User[]) {
    const dir = path.dirname(USERS_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password required" }, { status: 400 });
        }

        const users = await loadUsers();
        const userExists = users.find((u) => u.email === email);

        if (userExists) {
            return NextResponse.json({ message: "User already exists!" }, { status: 400 });
        }

        const newUser: User = { email, password };
        users.push(newUser);
        await saveUsers(users);

        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
        return NextResponse.json({ message: "Signup successful", token });
    } catch (error: any) {
        console.error("Signup Error:", error);
        return NextResponse.json({
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}
