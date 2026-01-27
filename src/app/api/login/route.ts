import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const SECRET_KEY = "supersecretkey123";
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

// Zod schema for login validation
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

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

        // Validate input
        const result = loginSchema.safeParse(body);
        if (!result.success) {
            const errorMsg = result.error.issues[0].message;
            return NextResponse.json({ message: errorMsg }, { status: 400 });
        }

        const { email, password } = result.data;

        const users = await loadUsers();
        const user = users.find((u) => u.email === email);

        if (!user || !user.password) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
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
