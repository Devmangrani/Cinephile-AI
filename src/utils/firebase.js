// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv1cYG5LhT2wmam6O7RkwhMqSOu768Wcg",
  authDomain: "netflix-app-444.firebaseapp.com",
  projectId: "netflix-app-444",
  storageBucket: "netflix-app-444.firebasestorage.app",
  messagingSenderId: "244650270148",
  appId: "1:244650270148:web:7875244446566a43a39891",
  measurementId: "G-FF3BPEMMFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
