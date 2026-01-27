/**
 * AethrCite Auth - Logic
 * Handles simple localStorage-based authentication.
 */

const Auth = {
    // Configuration
    STORAGE_KEY_USERS: 'aethrcite_users',
    STORAGE_KEY_SESSION: 'aethrcite_session',

    init: function () {
        this.checkRoutes();
    },

    // --- Core Logic ---

    getUsers: function () {
        const users = localStorage.getItem(this.STORAGE_KEY_USERS);
        return users ? JSON.parse(users) : [];
    },

    getSession: function () {
        const session = localStorage.getItem(this.STORAGE_KEY_SESSION);
        return session ? JSON.parse(session) : null;
    },

    // Simple hash simulation (NOT for production, just for this requirement)
    hashPassword: function (password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(16);
    },

    // --- Actions ---

    signup: function (username, email, password) {
        const users = this.getUsers();

        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        const newUser = {
            id: Date.now(),
            username,
            email,
            password: this.hashPassword(password),
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(users));

        return { success: true, message: 'Account created successfully' };
    },

    login: function (email, password) {
        const users = this.getUsers();
        const hashedPassword = this.hashPassword(password);

        const user = users.find(u => u.email === email && u.password === hashedPassword);

        if (user) {
            // Create session (exclude password)
            const sessionUser = { ...user };
            delete sessionUser.password;

            localStorage.setItem(this.STORAGE_KEY_SESSION, JSON.stringify(sessionUser));
            return { success: true };
        }

        return { success: false, message: 'Invalid email or password' };
    },

    logout: function () {
        localStorage.removeItem(this.STORAGE_KEY_SESSION);
        window.location.href = 'login.html';
    },

    // --- Routing & Guards ---

    checkRoutes: function () {
        const session = this.getSession();
        const path = window.location.pathname;
        const page = path.split('/').pop();

        const publicPages = ['login.html', 'signup.html'];
        const protectedPages = ['dashboard.html'];

        if (session) {
            // If logged in, protect public pages (redirect to dashboard)
            if (publicPages.includes(page)) {
                window.location.href = 'dashboard.html';
            }
        } else {
            // If not logged in, protect private pages (redirect to login)
            if (protectedPages.includes(page)) {
                window.location.href = 'login.html';
            }
        }
    }
};

// --- UI Helpers ---

const UI = {
    showError: function (inputId, message) {
        const input = document.getElementById(inputId);
        const parent = input.parentElement;
        parent.classList.add('input-error');

        // Find or create error message element
        let errorMsg = parent.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            parent.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    },

    clearError: function (inputId) {
        const input = document.getElementById(inputId);
        const parent = input.parentElement;
        parent.classList.remove('input-error');
    },

    showToast: function (message, type = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    isValidEmail: function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
};

// Initialize auth check immediately
Auth.init();
