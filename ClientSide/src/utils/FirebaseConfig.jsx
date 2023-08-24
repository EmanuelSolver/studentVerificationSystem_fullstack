import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBIenIBgKLMGoxo_LhR0wTRuE6VqnWX3Ro",
    authDomain: "student-verification-ca385.firebaseapp.com",
    projectId: "student-verification-ca385",
    storageBucket: "student-verification-ca385.appspot.com",
    messagingSenderId: "210842786676",
    appId: "1:210842786676:web:83ec63a7378fc133636a21",
    measurementId: "G-7Z1PDHSC70"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);