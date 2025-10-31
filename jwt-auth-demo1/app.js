// app.js
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { authenticateAccessToken } = require('./auth');

const app = express();
app.use(express.json());
app.use(cookieParser());

// In-memory database
const users = [];
const refreshTokens = [];

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const userExists = users.find(u => u.username === username);
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({ message: 'User registered successfully' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = jwt.sign({ username }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  res.json({ accessToken });
});

// Protected endpoint
app.get('/profile', authenticateAccessToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!`, user: req.user });
});

// Refresh token
app.post('/refresh', (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });
  if (!refreshTokens.includes(token)) return res.status(403).json({ message: 'Invalid refresh token' });

  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });
    const accessToken = jwt.sign({ username: user.username }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  });
});

// Logout
app.post('/logout', (req, res) => {
  const token = req.cookies.refreshToken;
  const index = refreshTokens.indexOf(token);
  if (index > -1) refreshTokens.splice(index, 1);
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
