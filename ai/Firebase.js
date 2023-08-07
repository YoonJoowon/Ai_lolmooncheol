import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "dor-project-12340.firebaseapp.com",
  projectId: "dor-project-12340",
  storageBucket: "dor-project-12340.appspot.com",
  messagingSenderId: "426903209241",
  appId: "1:426903209241:web:2626860b249ae1f5213188",
  measurementId: "G-8MGR4M93CP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
