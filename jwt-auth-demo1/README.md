# JWT Authentication Backend

A simple Node.js/Express backend implementing JWT (JSON Web Token) authentication with access and refresh tokens.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
node app.js
```

Server will start on port 3000 (configurable in `.env` file).

## 📋 Prerequisites

- Node.js (v16.x or higher)
- npm (comes with Node.js)

## 🔐 Environment Variables

The `.env` file contains:

```env
ACCESS_TOKEN_SECRET=yourAccessSecretKey123
REFRESH_TOKEN_SECRET=yourRefreshSecretKey123
PORT=3000
```

**Example with secure secrets:**
```env
ACCESS_TOKEN_SECRET=5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
REFRESH_TOKEN_SECRET=7c9e6679f9c3a5e8d3a9f8c6e5d4b3a2c1e8f7d6a5c4b3e2d1a9b8c7e6f5d4a3
PORT=3000
```

**⚠️ Important:** Change these secrets before deploying to production!

Generate secure secrets:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🛣️ API Endpoints

### POST /register
Register a new user.

**Request:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "message": "User registered successfully"
}
```

**Response (Error - 400):**
```json
{
  "message": "User already exists"
}
```

---

### POST /login
Login and receive access token and refresh token.

**Request:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Note:** Refresh token is sent as httpOnly cookie.

**Response (Error - 400):**
```json
{
  "message": "User not found"
}
```

**Response (Error - 401):**
```json
{
  "message": "Invalid credentials"
}
```

---

### GET /profile
Get user profile (Protected Route).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (Success - 200):**
```json
{
  "message": "Welcome testuser!",
  "user": {
    "username": "testuser",
    "iat": 1234567890,
    "exp": 1234568790
  }
}
```

**Response (Error - 401):**
```json
{
  "message": "Access token required"
}
```

**Response (Error - 403):**
```json
{
  "message": "Invalid or expired token"
}
```

---

### POST /refresh
Refresh access token using refresh token.

**Note:** Refresh token is read from httpOnly cookie.

**Response (Success - 200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error - 401):**
```json
{
  "message": "No refresh token"
}
```

**Response (Error - 403):**
```json
{
  "message": "Invalid refresh token"
}
```

---

### POST /logout
Logout and invalidate refresh token.

**Response (Success - 200):**
```json
{
  "message": "Logged out successfully"
}
```

## 🧪 Testing with cURL

### 1. Register a User

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"secret123"}'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"secret123"}' \
  -c cookies.txt
```

Copy the `accessToken` from the response.

### 3. Access Protected Route

```bash
curl -X GET http://localhost:3000/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

### 4. Refresh Token

```bash
curl -X POST http://localhost:3000/refresh \
  -b cookies.txt
```

### 5. Logout

```bash
curl -X POST http://localhost:3000/logout \
  -b cookies.txt
```

## 🧪 Testing with Postman

### 1. Register

- **Method:** POST
- **URL:** `http://localhost:3000/register`
- **Body (JSON):**
  ```json
  {
    "username": "john",
    "password": "secret123"
  }
  ```

### 2. Login

- **Method:** POST
- **URL:** `http://localhost:3000/login`
- **Body (JSON):**
  ```json
  {
    "username": "john",
    "password": "secret123"
  }
  ```
- **Important:** Copy the `accessToken` from the response

### 3. Access Protected Route

- **Method:** GET
- **URL:** `http://localhost:3000/profile`
- **Headers:**
  - Key: `Authorization`
  - Value: `Bearer <paste_your_access_token_here>`

### 4. Refresh Token

- **Method:** POST
- **URL:** `http://localhost:3000/refresh`
- **Note:** Ensure cookies are enabled in Postman and you've logged in first

### 5. Logout

- **Method:** POST
- **URL:** `http://localhost:3000/logout`

## 📦 Dependencies

- **express** - Fast, unopinionated web framework
- **jsonwebtoken** - JWT implementation for Node.js
- **bcrypt** - Password hashing library
- **dotenv** - Environment variable loader
- **cookie-parser** - Cookie parsing middleware

## 🔒 Security Features

### Password Security
- Passwords are hashed using bcrypt (with salt rounds = 10)
- Plain text passwords are never stored

### Token Security
- **Access Token:** Short-lived (15 minutes), sent in response body
- **Refresh Token:** Long-lived, stored in httpOnly cookie (not accessible via JavaScript)
- Separate secrets for access and refresh tokens

### Best Practices Implemented
- httpOnly cookies prevent XSS attacks on refresh tokens
- Token verification on protected routes
- Password comparison using bcrypt (timing-safe)

## ⚠️ Limitations

### Current Implementation
- Uses **in-memory storage** (data lost on server restart)
- No persistent database
- No token revocation list (logout only removes from memory)
- No rate limiting
- No input validation/sanitization

### Recommended Improvements for Production

1. **Use a Database:**
   ```bash
   npm install mongoose
   ```
   Store users in MongoDB or use PostgreSQL/MySQL

2. **Add Input Validation:**
   ```bash
   npm install joi
   ```
   Validate request bodies

3. **Add Rate Limiting:**
   ```bash
   npm install express-rate-limit
   ```
   Prevent brute-force attacks

4. **Add CORS:**
   ```bash
   npm install cors
   ```
   If accessing from frontend

5. **Use Environment-specific Configs:**
   - Separate `.env.development` and `.env.production`
   - Never commit `.env` files with real secrets

6. **Add Logging:**
   ```bash
   npm install morgan
   ```
   Log HTTP requests

7. **Add Security Headers:**
   ```bash
   npm install helmet
   ```
   Secure Express apps

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change PORT in .env file or kill the process:

# On Windows (find the process using port 3000):
netstat -ano | findstr :3000
# Note the PID (last column), then kill it:
taskkill /PID <replace_with_actual_PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Token expired:**
- Access tokens expire after 15 minutes
- Login again or use the refresh endpoint

## 📚 Additional Resources

- [JWT.io](https://jwt.io/) - Learn about JWT tokens
- [Express.js Docs](https://expressjs.com/)
- [Bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [JSON Web Token Best Practices](https://tools.ietf.org/html/rfc8725)

## 📝 Notes

- This is a demo/learning project
- Not production-ready without improvements mentioned above
- Use for educational purposes and local development
