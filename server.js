require('dotenv').config();

// Ensure required environment variables are set
const requiredEnv = ['DB_PASSWORD', 'JWT_SECRET', 'ADMIN_PASSWORD'];
requiredEnv.forEach(envVar => {
    if (!process.env[envVar]) {
        if (process.env.NODE_ENV === 'production') {
            console.error(`FATAL ERROR: ${envVar} is not defined.`);
            process.exit(1);
        } else {
            console.warn(`WARNING: ${envVar} is not defined. This might cause issues.`);
        }
    }
});

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

// Add error handler for the database pool
// Note: db is a promise pool, we need to access the underlying pool for 'error' event
db.pool.on('error', (err) => {
    console.error('Unexpected error on idle database connection', err);
});

const app = express();
app.use(cors());
app.use(express.json());

// Content Security Policy configuration for Helmet
// This allows the inline scripts and styles used in the frontend while keeping security
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "'unsafe-inline'"],
            "style-src": ["'self'", "'unsafe-inline'"],
            "img-src": ["'self'", "data:"],
        },
    })
);

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
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) return res.status(401).send('Invalid credentials');

        const match = await bcrypt.compare(password, users[0].password_hash);
        if (match) {
            const token = jwt.sign({ name: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


app.get('/api/posts', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


app.post('/api/posts', authenticateToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).send('Title and content are required');
        }
        await db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
