/**
 * Static Auth Library
 * Handles client-side authentication using localStorage.
 * Mimics a real backend auth system but runs entirely in the browser.
 */

export interface User {
    id: number;
    username: string;
    email: string;
    password?: string; // Hashed
    createdAt: string;
}

const STORAGE_KEY_USERS = 'aethrcite_users';
const STORAGE_KEY_SESSION = 'aethrcite_session';

export const StaticAuth = {
    // --- Helpers ---
    getUsers: (): User[] => {
        if (typeof window === 'undefined') return [];
        const users = localStorage.getItem(STORAGE_KEY_USERS);
        return users ? JSON.parse(users) : [];
    },

    getSession: (): User | null => {
        if (typeof window === 'undefined') return null;
        const session = localStorage.getItem(STORAGE_KEY_SESSION);
        return session ? JSON.parse(session) : null;
    },

    hashPassword: (password: string): string => {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16);
    },

    // --- Actions ---

    signup: (username: string, email: string, password: string): { success: boolean; message: string } => {
        const users = StaticAuth.getUsers();

        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        const newUser: User = {
            id: Date.now(),
            username,
            email,
            password: StaticAuth.hashPassword(password),
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));

        return { success: true, message: 'Account created successfully' };
    },

    login: (email: string, password: string): { success: boolean; message?: string } => {
        const users = StaticAuth.getUsers();
        const hashedPassword = StaticAuth.hashPassword(password);

        const user = users.find(u => u.email === email && u.password === hashedPassword);

        if (user) {
            // Create session (safe copy)
            const sessionUser = { ...user };
            delete sessionUser.password;

            localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(sessionUser));
            return { success: true };
        }

        return { success: false, message: 'Invalid email or password' };
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEY_SESSION);
        window.location.href = '/login';
    },

    checkSession: () => {
        return StaticAuth.getSession() !== null;
    }
};
