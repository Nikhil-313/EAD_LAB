# Quick Start Guide

Get the project running in under 5 minutes!

## 🚀 Backend (JWT Authentication Server)

### Step 1: Install Node.js
If you don't have Node.js installed, download it from: https://nodejs.org/

### Step 2: Setup Backend
```bash
# Navigate to backend directory
cd jwt-auth-demo1

# Install dependencies
npm install

# Start the server
node app.js
```

You should see: `Server running on port 3000`

### Step 3: Test the Backend
Open a new terminal and try these commands:

```bash
# Register a user
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"demo123"}'

# Login (copy the access token from response)
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"demo123"}'

# Access protected route (replace YOUR_TOKEN with the token from login)
curl -X GET http://localhost:3000/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

✅ Backend is ready!

## 🎨 Frontend (HTML Files)

### Method 1: Open Directly
Simply double-click any HTML file:
- `calculator.html` - Calculator app
- `registration.html` - Registration form
- `chessboard.html` - Chessboard display
- `time_table.html` - Time table

### Method 2: Use a Local Server (Recommended)

**Option A: Python**
```bash
# In the project root directory
python -m http.server 8000
```
Then open: http://localhost:8000/calculator.html

**Option B: Node.js**
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Run server
http-server -p 8000
```
Then open: http://localhost:8000/

✅ Frontend is ready!

## 🧪 Quick Test Flow

1. **Start backend** (in one terminal):
   ```bash
   cd jwt-auth-demo1
   node app.js
   ```

2. **Test with Postman or curl** (in another terminal):
   - Register: POST to `http://localhost:3000/register`
   - Login: POST to `http://localhost:3000/login`
   - Profile: GET to `http://localhost:3000/profile` (with Authorization header)

3. **Open frontend** (in browser):
   - Open any HTML file directly or via local server

## 📱 Note about Android Frontend

**Currently, there is no Android application in this repository.** The "frontend" consists of:
- HTML/CSS/JavaScript files (calculator, registration form, etc.)
- React JSX components (Counter, PasswordStrengthChecker, etc.)

If you need to create an Android app that connects to this backend:

### Option 1: Create React Native App
```bash
npx react-native init MyApp
# Then use fetch/axios to call the backend API
```

### Option 2: Create Native Android App
- Use Android Studio
- Create a new project
- Use Retrofit or OkHttp to call the backend API at `http://10.0.2.2:3000` (for emulator) or your computer's IP address

### Option 3: Use the HTML files in a WebView
- Create an Android app with a WebView component
- Load the HTML files into the WebView

## 🆘 Need Help?

See the full [README.md](README.md) for detailed instructions and troubleshooting.

### Common Issues

**"Port 3000 already in use"**
- Change PORT in `.env` file to 3001 or another available port

**"Cannot find module 'express'"**
- Run `npm install` in the jwt-auth-demo1 directory

**HTML files not loading styles**
- Use a local server (Python or http-server) instead of opening files directly

## 📚 Next Steps

- Read [README.md](README.md) for comprehensive documentation
- Read [jwt-auth-demo1/README.md](jwt-auth-demo1/README.md) for backend API details
- Explore the HTML and JSX components
- Try building your own features!

---

**That's it! You're all set up. Happy coding! 🎉**
