// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blackbirdai.firebaseapp.com",
  projectId: "blackbirdai",
  storageBucket: "blackbirdai.appspot.com",
  messagingSenderId: "320050686008",
  appId: "1:320050686008:web:3481a6dd98ea1ba7735ecd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);