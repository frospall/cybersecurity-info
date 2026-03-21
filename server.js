const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// BACKEND SECURITY WALL
// ==========================================

// 1. Helmet: Sets various HTTP headers to secure the app
app.use(helmet({
    contentSecurityPolicy: false, // Disabled for demo purposes so external fonts/data can load
}));

// 2. CORS: Enable Cross-Origin Resource Sharing
app.use(cors());

// 3. Rate Limiting: Prevent DDoS and brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

// 4. Hide Express signature
app.disable('x-powered-by');

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for SPA (if needed)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`[SECURITY SYSTEM ONLINE] Server running on port ${PORT}`);
});
