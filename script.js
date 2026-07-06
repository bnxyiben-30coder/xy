// ==================== PART 1: Variables ====================
let recaptchaToken = null;
const FILE_NAME = "snaptik_7572727548182859040_v3.mp4";
const SECRET_KEY = "6LcIpkYtAAAAAKAQ_c7bMN3Umi-tO2kQWt9b7tKh";

// ==================== PART 2: reCAPTCHA Callback ====================
function onRecaptchaSuccess(token) {
    recaptchaToken = token;
    document.getElementById('downloadBtn').disabled = false;
    document.getElementById('status').innerHTML = '<span style="color: #28a745;">✓ reCAPTCHA verified</span>';
}

// ==================== PART 3: Download Handler ====================
async function handleDownload() {
    const btn = document.getElementById('downloadBtn');
    const status = document.getElementById('status');
    
    if (!recaptchaToken) {
        alert("Please complete the reCAPTCHA first.");
        return;
    }

    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Downloading...';
    status.innerHTML = 'Preparing download...';

    try {
        const response = await fetch(FILE_NAME);
        
        if (!response.ok) {
            throw new Error("File not found.");
        }

        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = FILE_NAME;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        status.innerHTML = '<span style="color: #28a745;"> Download started successfully!</span>';
        btn.style.background = 'linear-gradient(135deg, #28a745, #218838)';

        setTimeout(() => {
            btn.style.background = 'linear-gradient(135deg, #007bff, #0056b3)';
        }, 2000);

    } catch (error) {
        console.error(error);
        status.innerHTML = '<span style="color: #dc3545;">❌ Download failed. Check if file exists.</span>';
        alert("Download failed. Make sure the file is in the same folder as index.html");
    } finally {
        setTimeout(() => {
            btn.innerHTML = 'Download File';
            btn.disabled = false;
            resetRecaptcha();
        }, 2500);
    }
}

// Reset reCAPTCHA
function resetRecaptcha() {
    recaptchaToken = null;
    if (typeof grecaptcha !== "undefined") {
        grecaptcha.reset();
    }
    document.getElementById('downloadBtn').disabled = true;
    document.getElementById('status').innerHTML = '';
}