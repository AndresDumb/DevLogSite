require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'blog_admin',
    password: process.env.DB_PASSWORD,
    database: 'blog_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const promisePool =pool.promise();
module.exports = promisePool;