// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAnxvOd2Sn60DjjiygUlQ0wiqDeyRpMjE",
  authDomain: "expense-3ac9e.firebaseapp.com",
  projectId: "expense-3ac9e",
  storageBucket: "expense-3ac9e.appspot.app",
  messagingSenderId: "465902522864",
  appId: "1:465902522864:web:7d02ce41fb8a4d539b8d35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;