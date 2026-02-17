require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(express.static('public')); // Serves HTML files


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) return res.status(400).send('User not found');

    if (await bcrypt.compare(password, users[0].password_hash)) {
        const token = jwt.sign({ name: username }, process.env.JWT_SECRET);
        res.json({ token }); // Send the key to the frontend
    } else {
        res.status(403).send('Not Allowed');
    }
});


app.get('/api/posts', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(rows);
});


app.post('/api/posts', authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    await db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
    res.sendStatus(201);
});

app.listen(3000, () => console.log('Server running on port 3000'));
