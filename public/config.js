const config = {
    // For local development, this defaults to empty string which means the same origin
    // For production (GitHub Pages), set this to your hosted backend URL (e.g., "https://your-backend.onrender.com")
    API_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? '' 
        : 'REPLACE_WITH_YOUR_BACKEND_URL'
};
