document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const terminalScreen = document.getElementById('terminal-screen');
    const terminalOutput = document.getElementById('terminal-output');
    const restartBtn = document.getElementById('restart-btn');

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
             document.getElementById('end-screen').classList.remove('active');
             terminalOutput.innerHTML = '';
             welcomeScreen.classList.add('active');
        });
    }

    let userData = {
        ip: "Analyzing...",
        country: "Unknown",
        city: "Unknown",
        isp: "Unknown",
        time: new Date().toLocaleString()
    };

    // Fetch real IP and location data
    async function fetchUserData() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            userData.ip = data.ip || "192.168.1." + Math.floor(Math.random() * 255);
            userData.country = data.country_name || "Unknown";
            userData.city = data.city || "Unknown";
            userData.isp = data.org || "Unknown";
        } catch (error) {
            console.error("Failed to fetch IP data", error);
            userData.ip = "192.168.1." + Math.floor(Math.random() * 255);
            userData.country = "Local Network";
        }
    }

    startBtn.addEventListener('click', async () => {
        welcomeScreen.classList.remove('active');
        terminalScreen.classList.add('active');
        
        await fetchUserData();
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
            { text: `[INFO] Retrieving public network identifiers...`, type: 'info', delay: 800 },
            { text: `Target IP Address: <span class="highlight">${userData.ip}</span>`, type: 'warning', delay: 1200 },
            { text: `Location: <span class="highlight">${userData.city}, ${userData.country}</span>`, type: 'warning', delay: 1000 },
            { text: `ISP/Provider: <span class="highlight">${userData.isp}</span>`, type: 'warning', delay: 800 },
            { text: `Local Device Time: <span class="highlight">${userData.time}</span>`, type: 'warning', delay: 1000 },
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
