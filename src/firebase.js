// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS7yovVAkvhFAs9czYfJc4ZqzDYKeLTVE",
  authDomain: "expense-tracker-ac1eb.firebaseapp.com",
  projectId: "expense-tracker-ac1eb",
  storageBucket: "expense-tracker-ac1eb.firebasestorage.app",
  messagingSenderId: "123813794071",
  appId: "1:123813794071:web:7199b5b123436a3cbca752",
  measurementId: "G-R2H2V1P8NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};