// Small login/signup API for the education site.
// Routes: GET /api/health, POST /api/signup, POST /api/login
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('JWT_SECRET is not set. Add it to your .env file.');
  process.exit(1);
}

// Connection settings come from env vars (PGHOST, PGUSER, PGPASSWORD, PGDATABASE).
const db = new Pool();

const app = express();
app.use(express.json());

// Used by Docker's healthcheck: is the server up and can it reach the database?
app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(503).json({ status: 'db_unreachable' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { email, username, password } = req.body || {};
  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Email, username and password are required' });
  }
  if (!email.includes('@')) return res.status(400).json({ error: 'Invalid email' });
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3)',
      [email.trim().toLowerCase(), username.trim(), hash]
    );
    res.status(201).json({ message: 'Account created, you can log in now' });
  } catch (err) {
    if (err.code === '23505') { // unique constraint violation
      return res.status(409).json({ error: 'Username or email already taken' });
    }
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username.trim()]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: `Welcome back, ${user.username}!`, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Create the users table if it doesn't exist yet, then start listening.
async function start() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id            SERIAL PRIMARY KEY,
      email         TEXT UNIQUE NOT NULL,
      username      TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at    TIMESTAMPTZ DEFAULT now()
    )`);
  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
}

start().catch((err) => {
  console.error('Failed to start:', err.message);
  process.exit(1);
});
