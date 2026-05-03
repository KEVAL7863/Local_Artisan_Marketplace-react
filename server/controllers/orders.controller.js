const pool = require('../config/db');

exports.list = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = `SELECT o.*, json_agg(json_build_object('name', oi.name, 'qty', oi.qty, 'price', oi.price)) as items
                 FROM orders o
                 LEFT JOIN order_items oi ON o.id = oi.order_id
                 WHERE 1=1`;
    const params = [];

    if (status) {
      params.push(status);
      query += ` AND o.status = $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (o.order_number ILIKE $${params.length} OR o.customer_name ILIKE $${params.length})`;
    }

    query += ' GROUP BY o.id ORDER BY o.created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listMine = async (req, res) => {
  try {
    // Get orders that contain products belonging to this artisan
    const result = await pool.query(
      `SELECT DISTINCT o.*, json_agg(json_build_object('name', oi.name, 'qty', oi.qty, 'price', oi.price)) as items
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN products p ON oi.product_id = p.id
       WHERE p.artisan_id = $1
       GROUP BY o.id ORDER BY o.created_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { customer_name, items, amount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must have at least one item' });
    }

    const orderNumber = `#ORD-${Math.floor(Math.random() * 9000) + 1000}`;
    const customerId = req.user ? req.user.id : null;
    const name = customer_name || (req.user ? req.user.name : 'Guest Customer');

    const orderResult = await client.query(
      `INSERT INTO orders (order_number, customer_id, customer_name, amount)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [orderNumber, customerId, name, amount]
    );

    const order = orderResult.rows[0];

    // Insert order items and decrement stock
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, name, qty, price)
         VALUES ($1, $2, $3, $4, $5)`,
        [order.id, item.product_id || null, item.name, item.qty, item.price]
      );

      // Decrement stock
      if (item.product_id) {
        await client.query(
          'UPDATE products SET stock = GREATEST(stock - $1, 0) WHERE id = $2',
          [item.qty, item.product_id]
        );
      }
    }

    // Create notification
    await client.query(
      `INSERT INTO notifications (notification_key, type, title, message, icon, color, link)
       VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (notification_key) DO NOTHING`,
      [
        `order-${order.order_number}-${Date.now()}`,
        'order',
        'New Order Placed',
        `${name} placed order ${order.order_number} worth ₹${amount}`,
        'shopping_cart',
        'blue',
        '/admin/orders',
      ]
    );

    await client.query('COMMIT');
    res.status(201).json(order);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Processing', 'Shipped', 'Delivered'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
