-- Seed Users (passwords hashed with bcrypt - all use their respective plain passwords)
-- collector123, artisan123, admin123
INSERT INTO users (name, email, password_hash, role, studio, craft) VALUES
  ('Collector User', 'collector@artisan.com', '$2b$10$placeholder_collector', 'user', NULL, NULL),
  ('Raj Vadher', 'artisan@artisan.com', '$2b$10$placeholder_artisan', 'artist', 'Arjun Pottery', 'Ceramics'),
  ('Keval Gelani', 'admin@artisan.com', '$2b$10$placeholder_admin', 'admin', NULL, NULL),
  ('Ananya Sharma', 'ananya@artisan.com', '$2b$10$placeholder_ananya', 'artist', 'Ananya Crafts', 'Jewelry'),
  ('Vikram Malhotra', 'vikram@artisan.com', '$2b$10$placeholder_vikram', 'user', NULL, NULL),
  ('Rohan Singh', 'rohan@artisan.com', '$2b$10$placeholder_rohan', 'artist', 'Rohan Woodworks', 'Woodwork'),
  ('Priya Das', 'priya@artisan.com', '$2b$10$placeholder_priya', 'user', NULL, NULL);

-- Seed Products (6 base products)
INSERT INTO products (slug, title, category, price, stock, description, image_url, artisan_id, is_base_product) VALUES
  ('prod-1', 'Rustic Clay Vase', 'Ceramics', 399.00, 15, 'Handcrafted rustic clay vase with earthy tones', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400', 2, true),
  ('prod-2', 'Live Edge Board', 'Woodwork', 799.00, 8, 'Beautiful live edge cutting board made from walnut', 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400', 6, true),
  ('prod-3', 'Silver Moon Drops', 'Jewelry', 1199.00, 20, 'Elegant silver earrings with moonstone accents', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400', 4, true),
  ('prod-4', 'Linen Woven Throw', 'Textiles', 599.00, 12, 'Soft handwoven linen throw blanket', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', 2, true),
  ('prod-5', 'Indigo Speckled Bowl', 'Ceramics', 299.00, 25, 'Hand-thrown ceramic bowl with indigo speckled glaze', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400', 2, true),
  ('prod-6', 'Hand-Carved Servers', 'Woodwork', 499.00, 10, 'Set of hand-carved wooden serving utensils', 'https://images.unsplash.com/photo-1605627079912-97c3810a11a4?w=400', 2, true);

-- Seed Orders
INSERT INTO orders (order_number, customer_id, customer_name, date, amount, status) VALUES
  ('#ORD-9921', 5, 'Rajesh Kumar', '2026-02-10', 4500.00, 'Delivered'),
  ('#ORD-9922', 7, 'Anita Desai', '2026-02-12', 1200.00, 'Shipped'),
  ('#ORD-9923', 5, 'Suresh Prabhu', '2026-02-15', 850.00, 'Processing'),
  ('#ORD-9924', 7, 'Meera Shah', '2026-02-18', 2100.00, 'Shipped'),
  ('#ORD-9925', 1, 'Vikram Singh', '2026-02-20', 3400.00, 'Processing');

-- Seed Order Items
INSERT INTO order_items (order_id, product_id, name, qty, price) VALUES
  (1, 1, 'Rustic Clay Vase', 2, 399.00),
  (1, 3, 'Silver Moon Drops', 3, 1199.00),
  (2, 4, 'Linen Woven Throw', 2, 599.00),
  (3, 5, 'Indigo Speckled Bowl', 2, 299.00),
  (4, 2, 'Live Edge Board', 1, 799.00),
  (4, 3, 'Silver Moon Drops', 1, 1199.00),
  (5, 6, 'Hand-Carved Servers', 4, 499.00);

-- Seed Artisan Approvals
INSERT INTO artisan_approvals (name, tag, date, logo_url, status) VALUES
  ('Handmade Pottery Co.', 'Ceramics', '2026-03-18', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=100', 'Pending'),
  ('Rustic Leather Goods', 'Leatherwork', '2026-03-15', 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=100', 'Pending'),
  ('Green Leaf Botanicals', 'Organic Skincare', '2026-03-10', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100', 'Pending'),
  ('Urban Woodcarvers', 'Woodworking', '2026-03-05', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=100', 'Pending');

-- Seed Admin Settings
INSERT INTO admin_settings (key, value) VALUES
  ('siteName', 'Artisan Marketplace'),
  ('commission', '10'),
  ('currency', 'INR'),
  ('autoApprove', 'false'),
  ('emailNotifications', 'true'),
  ('orderNotifications', 'true'),
  ('newUserNotifications', 'true'),
  ('maintenanceMode', 'false'),
  ('maxProductsPerArtisan', '50'),
  ('minOrderAmount', '100');
