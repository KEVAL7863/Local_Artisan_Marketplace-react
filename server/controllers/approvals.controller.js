const pool = require('../config/db');

exports.list = async (req, res) => {
  try {
    const { search } = req.query;
    let query = 'SELECT * FROM artisan_approvals WHERE 1=1';
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (name ILIKE $${params.length} OR tag ILIKE $${params.length})`;
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

    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      'UPDATE artisan_approvals SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Approval not found' });
    }

    // Create notification
    await pool.query(
      `INSERT INTO notifications (notification_key, type, title, message, icon, color, link)
       VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (notification_key) DO NOTHING`,
      [
        `approval-${id}-${status}-${Date.now()}`,
        'approval',
        `Artisan ${status}`,
        `${result.rows[0].name} has been ${status.toLowerCase()}`,
        'verified_user',
        status === 'Approved' ? 'green' : 'red',
        '/admin/approvals',
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
