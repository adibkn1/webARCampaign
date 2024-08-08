import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { app } from './firebaseConfig.js'; // Ensure this import works correctly

// Extract the token from the URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
    const database = getDatabase(app);
    const rakhiRef = ref(database, 'rakhis/' + token);

    onValue(rakhiRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Update the greeting with names fetched from Firebase
            document.getElementById('greeting').innerText = `${data.sisterName} sent this Digital Rakhi to ${data.brotherName} with love`;
        } else {
            document.getElementById('greeting').innerText = 'No Rakhi information found.';
        }
    }, (error) => {
        console.error('Error fetching data:', error);
        document.getElementById('greeting').innerText = 'Failed to retrieve Rakhi information.';
    });
} else {
    document.getElementById('greeting').innerText = 'No token provided in the URL.';
}
