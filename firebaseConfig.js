// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAv5H0-jgze_z1dvT8mHFRwusYXAiTSJgw",
    authDomain: "digitalrakhi-f8060.firebaseapp.com",
    databaseURL: "https://digitalrakhi-f8060-default-rtdb.firebaseio.com",
    projectId: "digitalrakhi-f8060",
    storageBucket: "digitalrakhi-f8060.appspot.com",
    messagingSenderId: "360526523502",
    appId: "1:360526523502:web:3e1af0fd17e9bb1ca5ca7f",
    measurementId: "G-FPJ5LHJEVS"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics(); // Analytics can be removed if not needed
  
  // Firebase Realtime Database interaction
  function submitToRealtimeDatabase(formData) {
    const dbRef = firebase.database().ref('rakhis');
    dbRef.push(formData).then(() => {
      console.log("Data saved to Realtime Database!");
    }).catch(error => {
      console.error("Error writing document: ", error);
    });
  }
  