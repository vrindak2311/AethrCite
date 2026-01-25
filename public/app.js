/**
 * AethrCite - Core Application Logic
 * Handles Routing, Authentication, Plagiarism Detection, and History
 */

const app = {
    currentUser: null,
    currentView: 'login',
    history: [],

    init() {
        this.loadUser();
        this.loadHistory();
        this.renderNavbar();
        
        // Initial route
        if (this.currentUser) {
            this.navigate('dashboard');
        } else {
            this.navigate('login');
        }
    },

    // --- State Management ---
    loadUser() {
        const user = localStorage.getItem('aethrcite_user');
        if (user) this.currentUser = JSON.parse(user);
    },

    saveUser(user) {
        this.currentUser = user;
        localStorage.setItem('aethrcite_user', JSON.stringify(user));
        this.renderNavbar();
    },

    loadHistory() {
        const history = localStorage.getItem('aethrcite_history');
        if (history) this.history = JSON.parse(history);
    },

    saveHistory() {
        localStorage.setItem('aethrcite_history', JSON.stringify(this.history));
    },

    // --- Routing ---
    navigate(view) {
        this.currentView = view;
        const container = document.getElementById('app-view');
        const template = document.getElementById(`tpl-${view}`);
        
        if (!template) {
            // Default to home/dashboard if authenticated, else login
            if (this.currentUser) view = 'dashboard';
            else view = 'login';
        }

        container.innerHTML = '';
        container.appendChild(document.importNode(document.getElementById(`tpl-${view}`).content, true));
        
        this.updateActiveLink(view);
        this.initViewLogic(view);
        window.scrollTo(0, 0);
    },

    updateActiveLink(view) {
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            if (link.getAttribute('onclick')?.includes(`'${view}'`)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    renderNavbar() {
        const navLinks = document.getElementById('nav-links');
        if (this.currentUser) {
            navLinks.innerHTML = `
                <li><a href="#" onclick="app.navigate('dashboard')">Dashboard</a></li>
                <li><a href="#" onclick="app.navigate('history')">History</a></li>
                <li><a href="#" onclick="app.logout()">Logout</a></li>
            `;
        } else {
            navLinks.innerHTML = `
                <li><a href="#" onclick="app.navigate('login')">Login</a></li>
                <li><a href="#" onclick="app.navigate('signup')">Sign Up</a></li>
            `;
        }
    },

    // --- View Logic Initialization ---
    initViewLogic(view) {
        if (view === 'login') this.initLogin();
        if (view === 'signup') this.initSignup();
        if (view === 'dashboard') this.initDashboard();
        if (view === 'history') this.renderHistory();
    },

    initLogin() {
        const form = document.getElementById('login-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            // Mock login
            this.saveUser({ email, name: email.split('@')[0] });
            this.navigate('dashboard');
        });
    },

    initSignup() {
        const form = document.getElementById('signup-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            // Mock signup
            this.saveUser({ email, name });
            this.navigate('dashboard');
        });
    },

    initDashboard() {
        const checkBtn = document.getElementById('check-btn');
        const textarea = document.getElementById('code-textarea');
        const fileUpload = document.getElementById('file-upload');

        checkBtn.addEventListener('click', () => {
            const code = textarea.value.trim();
            if (!code) {
                alert('Please enter or upload some code first.');
                return;
            }
            this.runPlagiarismCheck(code);
        });

        fileUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                textarea.value = event.target.result;
            };

            // Basic text reading for demo
            if (file.type === "application/pdf" || file.type.startsWith("image/")) {
                textarea.value = `// Simulated file content for: ${file.name}\nfunction example() {\n    console.log("This is a simulation of file parsing.");\n}`;
            } else {
                reader.readAsText(file);
            }
        });
    },

    // --- Core Logic: Plagiarism Check ---
    runPlagiarismCheck(code) {
        // Dummy logic: random percentage based on code length and keywords
        const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'return', 'class'];
        let matchedCount = 0;
        keywords.forEach(kw => {
            if (code.toLowerCase().includes(kw)) matchedCount++;
        });

        // Seeded random for "demo" consistency or just random
        const score = Math.floor(Math.random() * 40) + (matchedCount * 5);
        const finalScore = Math.min(score, 100);

        this.displayResults(finalScore, code);
        this.addToHistory(finalScore, code);
    },

    displayResults(score, code) {
        const resultsSection = document.getElementById('results-section');
        const suggestionSection = document.getElementById('suggestion-section');
        const scoreText = document.getElementById('score-text');
        const scoreCircle = document.getElementById('score-circle');
        const sourcesList = document.getElementById('sources-list');
        const aiCodeOutput = document.getElementById('ai-code-output');

        resultsSection.classList.remove('hidden');
        suggestionSection.classList.remove('hidden');

        // Update score UI
        scoreText.innerText = `${score}%`;
        scoreCircle.style.background = `conic-gradient(var(--primary) ${score}%, var(--bg-input) ${score}%)`;

        // Mock sources
        const sources = [
            { name: 'github.com/react/core', match: Math.floor(score * 0.6) },
            { name: 'stackoverflow.com/q/12345', match: Math.floor(score * 0.3) }
        ];

        sourcesList.innerHTML = '<h4>Matched Sources</h4>' + sources.map(s => `
            <div class="source-item">
                <span>${s.name}</span>
                <span class="source-percentage">${s.match}% match</span>
            </div>
        `).join('');

        // Mock AI suggestion
        const aiCode = this.generateAISuggestion(code);
        aiCodeOutput.innerText = aiCode;

        // Copy btn logic
        document.getElementById('copy-ai-btn').onclick = () => {
            navigator.clipboard.writeText(aiCode);
            alert('Code copied to clipboard!');
        };
    },

    generateAISuggestion(code) {
        return `// AI SUGGESTED UNIQUE VERSION\n// Optimized for 0% plagiarism\n\n${code.split('\n').map(line => line.startsWith('//') ? line : `/* Unique */ ${line.trim()}`).join('\n')}`;
    },

    // --- History Management ---
    addToHistory(score, code) {
        const item = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            score: score,
            preview: code.substring(0, 60) + (code.length > 60 ? '...' : '')
        };
        this.history.unshift(item);
        this.saveHistory();
    },

    renderHistory() {
        const container = document.getElementById('history-container');
        if (this.history.length === 0) {
            container.innerHTML = '<p class="text-muted">No history found. Start by checking some code!</p>';
            return;
        }

        container.innerHTML = this.history.map(item => {
            const colorClass = item.score < 20 ? 'percentage-low' : (item.score < 50 ? 'percentage-mid' : 'percentage-high');
            return `
                <div class="history-item">
                    <div class="history-info">
                        <h4>${item.preview}</h4>
                        <p>${item.date}</p>
                    </div>
                    <div class="history-stats">
                        <span class="history-percentage ${colorClass}">${item.score}%</span>
                        <button class="btn btn-outline btn-danger btn-small" onclick="app.deleteHistoryItem(${item.id})">Delete</button>
                    </div>
                </div>
            `;
        }).join('');
    },

    deleteHistoryItem(id) {
        this.history = this.history.filter(item => item.id !== id);
        this.saveHistory();
        this.renderHistory();
    },

    clearHistory() {
        if (confirm('Are you sure you want to clear all history?')) {
            this.history = [];
            this.saveHistory();
            this.renderHistory();
        }
    },

    logout() {
        this.currentUser = null;
        localStorage.removeItem('aethrcite_user');
        this.renderNavbar();
        this.navigate('login');
    }
};

// Initialize app on load
document.addEventListener('DOMContentLoaded', () => app.init());
