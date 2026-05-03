const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = require('../config/db');

async function migrate() {
  const client = await pool.connect();
  try {
    // Run schema
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await client.query(schema);
    console.log('Schema created successfully.');

    // Hash passwords for seed users
    const passwords = {
      collector: await bcrypt.hash('collector123', 10),
      artisan: await bcrypt.hash('artisan123', 10),
      admin: await bcrypt.hash('admin123', 10),
      ananya: await bcrypt.hash('ananya123', 10),
      vikram: await bcrypt.hash('vikram123', 10),
      rohan: await bcrypt.hash('rohan123', 10),
      priya: await bcrypt.hash('priya123', 10),
    };

    // Read seed SQL and replace placeholder hashes
    let seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    seed = seed.replace('$2b$10$placeholder_collector', passwords.collector);
    seed = seed.replace('$2b$10$placeholder_artisan', passwords.artisan);
    seed = seed.replace('$2b$10$placeholder_admin', passwords.admin);
    seed = seed.replace('$2b$10$placeholder_ananya', passwords.ananya);
    seed = seed.replace('$2b$10$placeholder_vikram', passwords.vikram);
    seed = seed.replace('$2b$10$placeholder_rohan', passwords.rohan);
    seed = seed.replace('$2b$10$placeholder_priya', passwords.priya);

    await client.query(seed);
    console.log('Seed data inserted successfully.');

    console.log('\nMigration complete! Default accounts:');
    console.log('  Customer: collector@artisan.com / collector123');
    console.log('  Artisan:  artisan@artisan.com  / artisan123');
    console.log('  Admin:    admin@artisan.com    / admin123');
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
