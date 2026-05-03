const pool = require('../config/db');

exports.list = async (req, res) => {
  try {
    const { role, search } = req.query;
    let query = 'SELECT id, name, email, role, studio, craft, status, created_at FROM users WHERE 1=1';
    const params = [];

    if (role) {
      params.push(role);
      query += ` AND role = $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (name ILIKE $${params.length} OR email ILIKE $${params.length})`;
    }

    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Active', 'Suspended'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      'UPDATE users SET status = $1 WHERE id = $2 RETURNING id, name, email, role, status',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Users can only update their own profile
    if (req.user.id !== parseInt(id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Cannot update another user\'s profile' });
    }

    const { name, studio, craft, bio, website, instagram } = req.body;

    const result = await pool.query(
      `UPDATE users SET name = COALESCE($1, name), studio = COALESCE($2, studio),
       craft = COALESCE($3, craft), bio = COALESCE($4, bio),
       website = COALESCE($5, website), instagram = COALESCE($6, instagram)
       WHERE id = $7
       RETURNING id, name, email, role, studio, craft, bio, website, instagram, status, created_at`,
      [name, studio, craft, bio, website, instagram, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
