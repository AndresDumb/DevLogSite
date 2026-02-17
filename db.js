require('dotenv').config();
const mysql = require('mysql2');

const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'blog_admin',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'blog_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
};

const pool = mysql.createPool(poolConfig);
const promisePool =pool.promise();
module.exports = promisePool;