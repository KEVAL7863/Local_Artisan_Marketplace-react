const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function sanitizeUser(user) {
  const { password_hash, ...safe } = user;
  return safe;
}

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, studio, craft } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role, studio, craft)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, email.toLowerCase().trim(), password_hash, role || 'user', studio || null, craft || null]
    );

    const user = sanitizeUser(result.rows[0]);
    const token = generateToken(user);

    // Create notification for admin
    await pool.query(
      `INSERT INTO notifications (notification_key, type, title, message, icon, color, link)
       VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (notification_key) DO NOTHING`,
      [
        `user-${user.id}-${Date.now()}`,
        'user',
        'New User Registered',
        `${name} joined as ${role === 'artist' ? 'an Artisan' : 'a Collector'}`,
        'person_add',
        'green',
        '/admin/users',
      ]
    );

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    if (user.status === 'Suspended') {
      return res.status(403).json({ error: 'Account is suspended' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({ user: sanitizeUser(user), token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(sanitizeUser(result.rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
