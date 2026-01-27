import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { loadUsers, saveUsers, hashPassword, authSchema, User } from '@/lib/simple-auth';

const SECRET_KEY = "supersecretkey123";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validation
        const result = authSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ message: result.error.issues[0].message }, { status: 400 });
        }

        const { email, password } = result.data;

        // 2. Check Existence
        const users = await loadUsers();
        if (users.find(u => u.email === email)) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // 3. Create User
        const hashedPassword = await hashPassword(password);
        const newUser: User = { email, password: hashedPassword };
        users.push(newUser);
        await saveUsers(users);

        // 4. Token
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

        return NextResponse.json({ message: "Signup successful", token });
    } catch (error: any) {
        console.error("Signup API Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
