# EAD LAB - Project Setup Guide

This repository contains various Enterprise Application Development lab exercises, including a JWT authentication backend, HTML/CSS/JavaScript frontend components, and React components.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Backend Setup (JWT Authentication)](#backend-setup-jwt-authentication)
- [Frontend Setup](#frontend-setup)
- [Testing the Application](#testing-the-application)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js and npm**
   - Download from: https://nodejs.org/
   - Recommended version: Node.js 16.x or higher
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Git** (for cloning the repository)
   - Download from: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version
     ```

3. **A Web Browser**
   - Chrome, Firefox, Safari, or Edge (latest version)

4. **A Code Editor** (recommended)
   - VS Code: https://code.visualstudio.com/
   - Or any editor of your choice

5. **API Testing Tool** (optional but recommended)
   - Postman: https://www.postman.com/downloads/
   - Or use curl/browser developer tools

## 📁 Project Structure

```
EAD_LAB/
├── jwt-auth-demo1/          # Backend Node.js JWT authentication server
│   ├── app.js               # Main Express application
│   ├── auth.js              # Authentication middleware
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables (tokens, port)
├── calculator.html          # Calculator web application
├── chessboard.html          # Chessboard display
├── registration.html        # Registration form
├── time_table.html          # Time table display
├── CRUD.js                  # CRUD operations demo (requires MongoDB)
├── Counter.jsx              # React counter component
├── Parent.jsx               # React parent component
├── Child.jsx                # React child component
├── PasswordStrengthChecker.jsx  # React password checker
├── PortalExample.jsx        # React portal example
└── TableWithPagination.jsx  # React table component
```

## 🚀 Backend Setup (JWT Authentication)

The backend is a Node.js/Express server with JWT authentication functionality.

### Step 1: Clone the Repository

```bash
git clone https://github.com/Nikhil-313/EAD_LAB.git
cd EAD_LAB
```

### Step 2: Navigate to Backend Directory

```bash
cd jwt-auth-demo1
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages:
- express - Web framework
- jsonwebtoken - JWT token generation and verification
- bcrypt - Password hashing
- dotenv - Environment variable management
- cookie-parser - Cookie handling

### Step 4: Configure Environment Variables

The `.env` file already contains default configuration:

```
ACCESS_TOKEN_SECRET=yourAccessSecretKey123
REFRESH_TOKEN_SECRET=yourRefreshSecretKey123
PORT=3000
```

**For production, change these secrets to secure random strings!**

To generate secure secrets, you can run:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 5: Start the Backend Server

```bash
node app.js
```

You should see:
```
Server running on port 3000
```

The backend server is now running at `http://localhost:3000`

### Available Backend Endpoints

| Method | Endpoint | Description | Authentication Required |
|--------|----------|-------------|------------------------|
| POST | /register | Register a new user | No |
| POST | /login | Login and get access token | No |
| GET | /profile | Get user profile | Yes (Bearer token) |
| POST | /refresh | Refresh access token | Yes (Refresh token in cookie) |
| POST | /logout | Logout and invalidate refresh token | No |

## 🎨 Frontend Setup

The frontend consists of standalone HTML files and React JSX components.

### Option 1: Running HTML Files Directly

The HTML files can be opened directly in a web browser:

#### Step 1: Navigate to Project Root

```bash
cd /path/to/EAD_LAB
```

#### Step 2: Open HTML Files

You can open any HTML file directly in your browser:

**Using Command Line:**

- **Windows:**
  ```bash
  start calculator.html
  start registration.html
  start chessboard.html
  start time_table.html
  ```

- **macOS:**
  ```bash
  open calculator.html
  open registration.html
  open chessboard.html
  open time_table.html
  ```

- **Linux:**
  ```bash
  xdg-open calculator.html
  xdg-open registration.html
  xdg-open chessboard.html
  xdg-open time_table.html
  ```

**Or simply:** Right-click any HTML file and select "Open with" → Your browser

### Option 2: Using a Local Development Server (Recommended)

For a better development experience and to avoid CORS issues:

#### Using Python's HTTP Server

If you have Python installed:

```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000/calculator.html` (or any other HTML file)

#### Using Node.js HTTP Server

Install http-server globally:

```bash
npm install -g http-server
```

Run the server:

```bash
http-server -p 8000
```

Access files at: `http://localhost:8000/`

#### Using VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click any HTML file
3. Select "Open with Live Server"

### Option 3: React Components (JSX Files)

The React components (`.jsx` files) are standalone examples. To use them:

#### Step 1: Create a React Application

```bash
npx create-react-app my-react-app
cd my-react-app
```

#### Step 2: Copy JSX Components

Copy any `.jsx` files from the root directory to `my-react-app/src/`:

```bash
cp ../Counter.jsx src/
cp ../PasswordStrengthChecker.jsx src/
cp ../PasswordStrengthChecker.css src/
# Copy other components as needed
```

#### Step 3: Import and Use Components

Edit `src/App.js`:

```javascript
import React from 'react';
import Counter from './Counter';
import PasswordStrengthChecker from './PasswordStrengthChecker';
import './PasswordStrengthChecker.css';

function App() {
  return (
    <div className="App">
      <h1>EAD Lab Components</h1>
      <Counter />
      <PasswordStrengthChecker />
      {/* Add other components */}
    </div>
  );
}

export default App;
```

#### Step 4: Start React Development Server

```bash
npm start
```

The app will open at `http://localhost:3000` (if backend is on 3000, React will suggest 3001)

## 🧪 Testing the Application

### Testing the Backend (JWT Authentication)

#### 1. Register a New User

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

Expected response:
```json
{"message":"User registered successfully"}
```

#### 2. Login

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}' \
  -c cookies.txt
```

Expected response:
```json
{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

Save the `accessToken` from the response.

#### 3. Access Protected Endpoint

```bash
curl -X GET http://localhost:3000/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

Expected response:
```json
{"message":"Welcome testuser!","user":{"username":"testuser","iat":...,"exp":...}}
```

#### 4. Using Postman

1. Open Postman
2. Create a new request
3. **Register:**
   - Method: POST
   - URL: `http://localhost:3000/register`
   - Body: Select "raw" and "JSON"
   - Add: `{"username":"testuser","password":"testpass123"}`
   - Click Send

4. **Login:**
   - Method: POST
   - URL: `http://localhost:3000/login`
   - Body: `{"username":"testuser","password":"testpass123"}`
   - Click Send
   - Copy the `accessToken` from response

5. **Access Profile:**
   - Method: GET
   - URL: `http://localhost:3000/profile`
   - Headers: Add `Authorization` with value `Bearer YOUR_ACCESS_TOKEN`
   - Click Send

### Testing Frontend HTML Files

1. **Calculator** (`calculator.html`):
   - Open in browser
   - Try basic arithmetic operations
   - Test keyboard input

2. **Registration Form** (`registration.html`):
   - Open in browser
   - Fill in all fields
   - Submit and check console/validation

3. **Chessboard** (`chessboard.html`):
   - Open in browser
   - View the chessboard display

4. **Time Table** (`time_table.html`):
   - Open in browser
   - View the formatted time table

## 🐛 Troubleshooting

### Backend Issues

**Problem: "Cannot find module 'express'"**
- Solution: Run `npm install` in the `jwt-auth-demo1` directory

**Problem: "Port 3000 already in use"**
- Solution: Either stop the process using port 3000, or change the PORT in `.env` file

**Problem: "Invalid or expired token"**
- Solution: Login again to get a new access token (tokens expire after 15 minutes)

**Problem: Dependencies not installing**
- Solution: Delete `node_modules` and `package-lock.json`, then run `npm install` again:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Frontend Issues

**Problem: HTML files not loading styles properly**
- Solution: Open files through a local server instead of file:// protocol

**Problem: React components not working**
- Solution: Make sure you've created a proper React app and imported components correctly

**Problem: CORS errors when calling backend from frontend**
- Solution: Add CORS middleware to backend:
  ```bash
  cd jwt-auth-demo1
  npm install cors
  ```
  Then add to `app.js`:
  ```javascript
  const cors = require('cors');
  app.use(cors());
  ```

## 📝 Additional Notes

### Security Considerations

- The current setup uses in-memory storage for users and tokens (data is lost when server restarts)
- For production, use a proper database (MongoDB, PostgreSQL, etc.)
- Always use strong, random secrets for JWT tokens
- Use HTTPS in production
- Implement rate limiting for authentication endpoints
- Add input validation and sanitization

### Development Tips

- Keep the backend server running in one terminal
- Use a separate terminal for frontend development
- Use browser developer tools (F12) to debug frontend issues
- Check backend console logs for API request debugging
- Use `.gitignore` to avoid committing `node_modules` and `.env` files with sensitive data

## 📚 Learning Resources

- Express.js: https://expressjs.com/
- JWT: https://jwt.io/
- React: https://react.dev/
- MDN Web Docs: https://developer.mozilla.org/

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is for educational purposes.
