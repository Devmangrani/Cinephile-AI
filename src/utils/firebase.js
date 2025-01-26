// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxRBD6lx32umjBrTgdsEBEfSDYBgk5lxQ",
  authDomain: "cinephile-ai.firebaseapp.com",
  projectId: "cinephile-ai",
  storageBucket: "cinephile-ai.firebasestorage.app",
  messagingSenderId: "566614745408",
  appId: "1:566614745408:web:3053e33f1ad1eb0f95daa5",
  measurementId: "G-BC391XV5H0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
