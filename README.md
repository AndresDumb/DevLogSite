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
1. Create a MySQL database named `blog_db`.
2. Create the required tables (Schema TODO):
   - `users`: `id`, `username`, `password_hash`
   - `posts`: `id`, `title`, `content`, `created_at`
3. Configure a database user (e.g., `blog_admin`) with appropriate permissions.

### 4. Environment Variables
Create a `.env` file in the root directory (refer to `.env` for current development values):
```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=blog_db
JWT_SECRET=your_secret_key
```

## Running the Application

### Start the server
```bash
node server.js
```
The server will run on [http://localhost:3000](http://localhost:3000).

- **Homepage**: [http://localhost:3000/index.html](http://localhost:3000/index.html)
- **Login**: [http://localhost:3000/login.html](http://localhost:3000/login.html)
- **Admin Panel**: [http://localhost:3000/admin.html](http://localhost:3000/admin.html)

## Project Structure
- `server.js`: Main entry point and API routes.
- `db.js`: Database connection pool configuration.
- `public/`: Static frontend assets (HTML, CSS, JS).
- `package.json`: Project dependencies and metadata.
- `.env`: Environment configuration (not committed to version control).
- `LICENSE`: Project license terms.

## Scripts
- `npm test`: Currently a placeholder (echoes error).
- **TODO**: Add a `start` script to `package.json` (`node server.js`).
- **TODO**: Add a `dev` script using `nodemon`.

## API Endpoints
- `POST /api/login`: Authenticate user and receive a JWT.
- `GET /api/posts`: Retrieve all blog posts.
- `POST /api/posts`: Create a new post (Requires JWT in `Authorization` header).

## License
This project is licensed under the [CC0 1.0 Universal](LICENSE) (Public Domain Dedication).
