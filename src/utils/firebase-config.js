// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVZrX-znI9vOR7HvPOO__SeuGMpng5wEI",
    authDomain: "file-share-app-6f8d5.firebaseapp.com",
    projectId: "file-share-app-6f8d5",
    storageBucket: "file-share-app-6f8d5.appspot.com",
    messagingSenderId: "203932687561",
    appId: "1:203932687561:web:fedc4b2fba35b8f7f4c118",
    measurementId: "G-CBP631W9JP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
