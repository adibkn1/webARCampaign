// Import the necessary Firebase SDKs
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

// Firebase configuration object containing all the necessary project details
export const firebaseConfig = {
    apiKey: "AIzaSyAv5H0-jgze_z1dvT8mHFRwusYXAiTSJgw",
    authDomain: "digitalrakhi-f8060.firebaseapp.com",
    databaseURL: "https://digitalrakhi-f8060-default-rtdb.firebaseio.com",
    projectId: "digitalrakhi-f8060",
    storageBucket: "digitalrakhi-f8060.appspot.com",
    messagingSenderId: "360526523502",
    appId: "1:360526523502:web:3e1af0fd17e9bb1ca5ca7f",
    measurementId: "G-FPJ5LHJEVS"
};

// Initialize Firebase App with the above configuration
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export the Firebase app and database instances for use elsewhere in your project
export { app, database };
