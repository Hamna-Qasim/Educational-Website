// Minimal backend: one health check and one login route. No database.
const express = require('express');

const app = express();
app.use(express.json());

// Demo user for practice (replace with a database later)
const DEMO_USER = { username: 'admin', password: 'admin123' };

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    return res.json({ message: `Welcome, ${username}!` });
  }
  res.status(401).json({ error: 'Invalid username or password' });
});

app.listen(3000, () => console.log('Backend running on port 3000'));
