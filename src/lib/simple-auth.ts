import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

// Interface for User
export interface User {
    email: string;
    password?: string;
}

// Ensure data directory exists
async function ensureDataDir() {
    const dir = path.dirname(USERS_FILE);
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

// Load all users safely
export async function loadUsers(): Promise<User[]> {
    try {
        await ensureDataDir();
        const fileContent = await fs.readFile(USERS_FILE, "utf8");
        return JSON.parse(fileContent);
    } catch (error: any) {
        if (error.code === 'ENOENT') return [];
        console.error("SimpleAuth: Error reading users file:", error);
        return [];
    }
}

// Save users safely
export async function saveUsers(users: User[]) {
    await ensureDataDir();
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// Hash password
export async function hashPassword(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, 10);
}

// Compare password
export async function comparePassword(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
}

// Validation Schemas
export const authSchema = z.object({
    email: z.string().email("Invalid email address").toLowerCase().trim(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
