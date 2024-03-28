// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiGAhlnAFr0AymvXfFGM4M65QTqN9SfvE",
  authDomain: "vite-contact07.firebaseapp.com",
  projectId: "vite-contact07",
  storageBucket: "vite-contact07.appspot.com",
  messagingSenderId: "887868054431",
  appId: "1:887868054431:web:eb3cba4e30c51e6d2abbaa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)