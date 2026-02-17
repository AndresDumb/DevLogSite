require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'blog_admin',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'blog_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
const promisePool =pool.promise();
module.exports = promisePool;