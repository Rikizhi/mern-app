// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlRs4SlSxCDDUgaaGZHOtNV-ZKeMRxN8E",
  authDomain: "mern-app-d342e.firebaseapp.com",
  projectId: "mern-app-d342e",
  storageBucket: "mern-app-d342e.appspot.com",
  messagingSenderId: "225683073771",
  appId: "1:225683073771:web:f45fb8b0ebfb7140d7ecae",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
