import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { firebaseConfig } from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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

    // Asynchronously set the data in Firebase and handle the UI response
    set(ref(database, 'rakhis/' + token), {
        sisterName,
        brotherName,
        email,
        mobile,
        createdAt: new Date().toISOString()
    }).then(() => {
        console.log('Data saved successfully with token:', token);
        const link = `https://adibkn1.github.io/webARCampaign/receiver.html?token=${token}`;
        handleSharing(link);
    }).catch(error => {
        console.error('Failed to save or share:', error);
        alert('Failed to process your request. Please try again.');
    });
});

function generateToken(name, email, mobile) {
    return name.slice(0, 3) + mobile.slice(-4); // Simplified token based on user input
}

function handleSharing(link) {
    if (navigator.share) {
        // Define the content to be shared
        const shareData = {
            title: 'Send Digital Rakhi',
            text: 'Check out this digital Rakhi I sent you!',
            url: link
        };

        // Use the Web Share API to share the link
        navigator.share(shareData)
            .then(() => console.log('Thanks for sharing!'))
            .catch(err => console.error('Error sharing:', err));
    } else {
        // Clipboard copy if sharing is not supported
        navigator.clipboard.writeText(`${shareData.title} ${shareData.text} ${link}`)
            .then(() => {
                alert('Link copied to clipboard! Please share manually.');
                console.log('Link copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy link:', err);
                alert('Failed to copy link. Please try manually.');
            });
    }
}

