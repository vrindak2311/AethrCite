import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const SECRET_KEY = "supersecretkey123";
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

// Zod schema for input validation
const signupSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

interface User {
    email: string;
    password?: string;
}

// Helper: Ensure data directory exists
async function ensureDataDir() {
    const dir = path.dirname(USERS_FILE);
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

async function loadUsers(): Promise<User[]> {
    try {
        await ensureDataDir();
        const fileContent = await fs.readFile(USERS_FILE, "utf8");
        return JSON.parse(fileContent);
    } catch (error: any) {
        // If file not found or empty, return empty array
        if (error.code === 'ENOENT') return [];
        console.error("Error reading users file:", error);
        return [];
    }
}

async function saveUsers(users: User[]) {
    await ensureDataDir();
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate input
        const result = signupSchema.safeParse(body);
        if (!result.success) {
            const errorMsg = result.error.issues[0].message;
            return NextResponse.json({ message: errorMsg }, { status: 400 });
        }

        const { email, password } = result.data;

        const users = await loadUsers();
        const userExists = users.find((u) => u.email === email);

        if (userExists) {
            return NextResponse.json({ message: "User already exists!" }, { status: 400 });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: User = { email, password: hashedPassword };

        users.push(newUser);
        await saveUsers(users);

        // Create JWT token
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
