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
    if (!fs.existsSync(USERS_FILE)) return [];
    const fileContent = fs.readFileSync(USERS_FILE, "utf8");
    try {
        return JSON.parse(fileContent);
    } catch {
        return [];
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const users = loadUsers();
        // Plain text password comparison as per user's provided code
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return NextResponse.json({ message: "Invalid credentials!" }, { status: 400 });
        }

        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
        return NextResponse.json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
