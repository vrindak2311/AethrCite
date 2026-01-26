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
        const fileContent = await fs.readFile(USERS_FILE, "utf8");
        return JSON.parse(fileContent);
    } catch {
        return [];
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const users = await loadUsers();
        // Plain text password comparison as per user's provided code
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return NextResponse.json({ message: "Invalid credentials!" }, { status: 401 });
        }

        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
        return NextResponse.json({ message: "Login successful", token });
    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json({
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}
