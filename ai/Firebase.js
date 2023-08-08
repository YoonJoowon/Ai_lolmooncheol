import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "aimoon-c9fa4.firebaseapp.com",
  projectId: "aimoon-c9fa4",
  storageBucket: "aimoon-c9fa4.appspot.com",
  messagingSenderId: "928734093079",
  appId: "1:928734093079:web:d9e3c6d2d41f26298f2152",
  measurementId: "G-W565SFZ6GF",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
