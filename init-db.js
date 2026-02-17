const db = require('./db');
const bcrypt = require('bcrypt');

async function initDb() {
  try {
    console.log('Initializing database...');
    
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Tables created.');

    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD;

    if (adminPass) {
      const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [adminUser]);
      if (rows.length === 0) {
        console.log(`Creating initial admin user: ${adminUser}`);
        const hash = await bcrypt.hash(adminPass, 10);
        await db.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [adminUser, hash]);
        console.log('Admin user created successfully.');
      } else {
        console.log(`Admin user "${adminUser}" already exists.`);
      }
    } else {
      console.warn('WARNING: ADMIN_PASSWORD not set. No admin user created.');
    }

    console.log('Database initialization complete.');
    process.exit(0);
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
}

initDb();
