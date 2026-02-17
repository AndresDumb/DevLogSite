# DevLogSite

A simple developer blog platform built with Node.js, Express, and MySQL, featuring JWT-based authentication for post management.

## Overview
This project provides a basic structure for a blog where:
- Anyone can view the posts on the homepage.
- An admin can log in to create new posts.
- Authentication is handled via JSON Web Tokens (JWT).
- Post and user data are stored in a MySQL database.

## Features
- **Public Feed**: View all blog posts sorted by creation date.
- **Admin Authentication**: Secure login using `bcrypt` for password hashing and `JWT` for session management.
- **Post Management**: Create new blog entries (Admin only).
- **Responsive Design**: Basic CSS styling for a clean reading experience.

## Stack
- **Language**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (using `mysql2` with promise support)
- **Authentication**: JWT, bcrypt
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Environment Management**: dotenv

## Requirements
- Node.js (v14 or later recommended)
- MySQL Server
- npm (Node Package Manager)

## Setup & Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd devlogsite
```

### 2. Install dependencies
```bash
npm install
```

### 3. Database Configuration
1. Create a MySQL database (e.g., named `blog_db`).
2. Run the initialization script to create the required tables:
   ```bash
   npm run init-db
   ```
3. Alternatively, manually create the tables:
   - `users`: `id`, `username`, `password_hash`
   - `posts`: `id`, `title`, `content`, `created_at`
4. Configure a database user with appropriate permissions.

### 4. Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=blog_db
DB_SSL=false
JWT_SECRET=your_very_secure_secret_key
```
Note: Set `DB_SSL=true` if your database provider (like Render or Aiven) requires SSL.

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## Deployment Recommendations

### 1. Platform-as-a-Service (PaaS) - e.g., Render, Heroku
- **Database**: Use a managed MySQL service (e.g., Aiven, PlanetScale, or Render's Managed MySQL).
- **Environment Variables**: Set `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `JWT_SECRET` in the platform's dashboard.
- **Auto-deployment**: Connect your GitHub repository for automatic builds.

### 2. Virtual Private Server (VPS) - e.g., DigitalOcean, Linode
- **Reverse Proxy**: Use **Nginx** or **Apache** as a reverse proxy to handle SSL (HTTPS) via Let's Encrypt.
- **Process Manager**: Use **PM2** to keep the application running: `pm2 start server.js`.
- **Security**: Ensure only ports 80 and 443 are open to the public; keep MySQL accessible only to `localhost`.

### 3. Security Checklist
- [ ] Use HTTPS (essential for JWT security).
- [ ] Use a strong, unique `JWT_SECRET`.
- [ ] Set `NODE_ENV=production` in your environment.
- [ ] Regularly update dependencies (`npm audit`).
- [ ] Use a firewall (e.g., UFW) on VPS.

## Project Structure
- `server.js`: Main entry point and API routes.
- `db.js`: Database connection pool configuration.
- `public/`: Static frontend assets (HTML, CSS, JS).
- `package.json`: Project dependencies and metadata.
- `.env`: Environment configuration (not committed to version control).
- `LICENSE`: Project license terms.

## Scripts
- `npm start`: Starts the production server.
- `npm run dev`: Starts the server in development mode using nodemon.
- `npm run init-db`: Initializes the database schema.
- `npm test`: Currently a placeholder (echoes error).

## API Endpoints
- `POST /api/login`: Authenticate user and receive a JWT.
- `GET /api/posts`: Retrieve all blog posts.
- `POST /api/posts`: Create a new post (Requires JWT in `Authorization` header).

## License
This project is licensed under the [CC0 1.0 Universal](LICENSE) (Public Domain Dedication).
