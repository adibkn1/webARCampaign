import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { firebaseConfig } from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Define the token generation logic
function generateToken(name, email, mobile) {
    return name.slice(0, 3) + mobile.slice(-4); // Simplified token based on user input
}

document.getElementById('rakhiForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const sisterName = document.getElementById('sisterName').value.trim();
    const brotherName = document.getElementById('brotherName').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const termsAccepted = document.getElementById('terms').checked;

    if (!sisterName || !brotherName || !email || !mobile || !termsAccepted) {
        alert('Please fill out all fields and accept the terms.');
        return;
    }

    const token = generateToken(sisterName, email, mobile);

    try {
        await set(ref(database, 'rakhis/' + token), {
            sisterName,
            brotherName,
            email,
            mobile,
            createdAt: new Date().toISOString()
        });
        console.log('Data saved successfully with token:', token);
        const link = `http://127.0.0.1:8080/receiver.html?token=${token}`;
        copyToClipboardAndShare(link);
    } catch (error) {
        console.error('Failed to save or share:', error);
        alert('Failed to process your request. Please try again.');
    }
});

async function copyToClipboardAndShare(link) {
    try {
        await navigator.clipboard.writeText(link);
        console.log('Link copied to clipboard!');
        openShareDialog(link);
    } catch (err) {
        console.error('Failed to copy link:', err);
        alert('Failed to copy link. Please try manually.');
    }
}

async function openShareDialog(link) {
    const imageFilePath = 'Images/digitalRakhiLink.jpg';

    try {
        const response = await fetch(imageFilePath);
        const blob = await response.blob();
        const filesArray = [new File([blob], 'digitalRakhiLink.jpg', { type: 'image/jpeg' })];

        if (navigator.canShare && navigator.canShare({ files: filesArray })) {
            await navigator.share({
                title: 'Send Digital Rakhi',
                text: 'Check out this digital Rakhi I sent you!',
                url: link,
                files: filesArray
            });
            console.log('Thanks for sharing!');
        } else {
            console.log('Sharing files is not supported on this device. Copy the link manually.');
        }
    } catch (err) {
        console.error('Error fetching the image or sharing:', err);
        alert('Error in sharing process.');
    }
}
