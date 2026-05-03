const pool = require('../config/db');

exports.list = async (req, res) => {
  try {
    const { category, sort } = req.query;
    let query = `SELECT p.*, u.name as artisan_name FROM products p
                 LEFT JOIN users u ON p.artisan_id = u.id WHERE 1=1`;
    const params = [];

    if (category && category !== 'All Crafts') {
      params.push(category);
      query += ` AND p.category = $${params.length}`;
    }

    switch (sort) {
      case 'price-low':
        query += ' ORDER BY p.price ASC';
        break;
      case 'price-high':
        query += ' ORDER BY p.price DESC';
        break;
      case 'newest':
      default:
        query += ' ORDER BY p.created_at DESC';
        break;
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listMine = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, u.name as artisan_name FROM products p
       LEFT JOIN users u ON p.artisan_id = u.id
       WHERE p.artisan_id = $1 ORDER BY p.created_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, category, price, stock, description, image_url } = req.body;

    if (!title || !category || !price) {
      return res.status(400).json({ error: 'Title, category and price are required' });
    }

    const slug = `ap-${Date.now()}`;

    const result = await pool.query(
      `INSERT INTO products (slug, title, category, price, stock, description, image_url, artisan_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [slug, title, category, price, stock || 0, description, image_url, req.user.id]
    );

    // Create notification
    await pool.query(
      `INSERT INTO notifications (notification_key, type, title, message, icon, color, link)
       VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (notification_key) DO NOTHING`,
      [
        `product-${result.rows[0].id}-${Date.now()}`,
        'product',
        'New Product Listed',
        `${title} was listed in ${category}`,
        'inventory_2',
        'amber',
        '/admin/orders',
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, price, stock, description, image_url } = req.body;

    // Check ownership
    const check = await pool.query('SELECT artisan_id FROM products WHERE id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (check.rows[0].artisan_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not your product' });
    }

    const result = await pool.query(
      `UPDATE products SET title = COALESCE($1, title), category = COALESCE($2, category),
       price = COALESCE($3, price), stock = COALESCE($4, stock),
       description = COALESCE($5, description), image_url = COALESCE($6, image_url)
       WHERE id = $7 RETURNING *`,
      [title, category, price, stock, description, image_url, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const check = await pool.query('SELECT artisan_id FROM products WHERE id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (check.rows[0].artisan_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not your product' });
    }

    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
