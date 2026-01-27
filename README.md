🚀 AethrCite
Write Code. Own It.

AethrCite is a modern, dark‑themed code plagiarism detection web application that allows users to check code originality, highlight duplicated sections, view plagiarism percentages, and maintain a personal history of submissions. It is designed as a clean, professional frontend project using HTML, CSS, and JavaScript.

📌 Features
🔐 Authentication
User Signup & Login system

Client‑side authentication using localStorage

Session handling with route protection

Secure password handling (frontend simulation)

🧠 Plagiarism Detection
Paste source code directly into the editor

Upload code via:

.txt files

PDFs

Images (basic extraction / simulation)

Detect plagiarism percentage

Highlight duplicated code segments

Display matched sources (demo logic)

🤖 AI‑Style Code Rewrite
Generates a rewritten version of code

Aims for 0% plagiarism

Preserves logic while changing structure and variables

One‑click copy functionality

📜 User History
Stores all plagiarism checks per user

View date, time, plagiarism score, and code preview

Delete individual records or clear all history

Data stored securely in browser storage

🎨 UI & UX
Dark theme only

No blue colors used

Clean, minimal, professional design

Fully responsive (mobile & desktop)

Smooth transitions and hover effects

📄 Legal Pages
Privacy Policy

Terms & Conditions

🛠️ Tech Stack
Technology	Usage
HTML5	Structure
CSS3	Styling & Dark Theme
JavaScript (Vanilla)	Logic & Interactivity
localStorage	Authentication & History
No Frameworks	Pure frontend
📂 Project Structure
AethrCite/
│
├── auth/
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── auth.css
│   └── auth.js
│
├── plagiarism/
│   ├── plagiarism.html
│   ├── plagiarism.css
│   └── plagiarism.js
│
├── history/
│   ├── history.html
│   └── history.js
│
├── legal/
│   ├── privacy.html
│   └── terms.html
│
├── assets/
│   └── icons / images
│
└── README.md
⚙️ How It Works
User signs up and logs in

User accesses dashboard

Code is submitted (paste or upload)

Plagiarism engine analyzes similarity

Result is shown with highlighted code

AI‑style rewritten code is generated

Submission is saved to user history

🚀 Getting Started
Run Locally
Clone the repository:

git clone https://github.com/your-username/AethrCite.git
Open signup.html in your browser

Create an account and login

Start checking code plagiarism

No backend or installation required.

🔒 Privacy & Security
User data is stored locally in the browser

Code submissions are private to the user

No external data sharing

Intended for educational and demo purposes

⚠️ Disclaimer
AethrCite is built for educational and learning purposes.
Plagiarism results are based on client‑side logic and should not be used as a legal or academic authority.

📈 Future Enhancements
Backend integration (Node.js / Flask)

Real database storage

GitHub code comparison

Advanced AST‑based plagiarism detection

Admin analytics dashboard

👨‍💻 Author
Anurag, Dushyant, Anisha, Vrinda, Kushagra.
Frontend Developer & Project Creator

⭐ Support
If you like this project:

Give it a ⭐ on GitHub

Share feedback

Suggest improvements

