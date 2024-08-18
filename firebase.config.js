// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3c5dod1N-rMz2UpIAyebPd6NWDOB8Ljw",
  authDomain: "toy-store-4e911.firebaseapp.com",
  projectId: "toy-store-4e911",
  storageBucket: "toy-store-4e911.appspot.com",
  messagingSenderId: "295077365583",
  appId: "1:295077365583:web:7ca7c864574ba73a8c673a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;