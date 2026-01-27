import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { loadUsers, comparePassword, authSchema } from '@/lib/simple-auth';

const SECRET_KEY = "supersecretkey123";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validation (Reuse schema, though password min length is less strict for login technically, but fine to enforce)
        // Relaxing password min length for login just in case legacy passwords were short (though we cleared data)
        // using safeParse is fine.
        const result = authSchema.safeParse(body);
        if (!result.success) {
            // For login, maybe we don't return specific validation errors to avoid leaking info, but for simplicity let's stay consistent
            return NextResponse.json({ message: result.error.issues[0].message }, { status: 400 });
        }

        const { email, password } = result.data;

        // 2. User Lookup
        const users = await loadUsers();
        const user = users.find(u => u.email === email);

        if (!user || !user.password) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // 3. Verify Password
        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // 4. Token
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

        return NextResponse.json({ message: "Login successful", token });
    } catch (error: any) {
        console.error("Login API Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
