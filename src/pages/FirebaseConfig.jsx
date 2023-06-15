// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//https://github.com/jgudo/ecommerce-react/blob/master/src/services/firebase.js
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPmUcsmjuBBxj9WA4SDhz9JPVpnnSRfAw",
  authDomain: "fir-neta.firebaseapp.com",
  projectId: "fir-neta",
  storageBucket: "fir-neta.appspot.com",
  messagingSenderId: "1039266515411",
  appId: "1:1039266515411:web:4d42541f029b3bfa628726",
  measurementId: "G-9RS3VT3C9V"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const getUsers =  getFirestore(app);

