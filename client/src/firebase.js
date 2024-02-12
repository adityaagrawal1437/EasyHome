// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "easyhome-4c47d.firebaseapp.com",
  projectId: "easyhome-4c47d",
  storageBucket: "easyhome-4c47d.appspot.com",
  messagingSenderId: "1017013117499",
  appId: "1:1017013117499:web:0f50b7a4576d7f9a38f21e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);