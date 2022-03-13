import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, push, onValue, child, onChildAdded, onChildChanged } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCh9gKfa2QVB7w9Rmc1U6f21wW8BjQyygE",
  authDomain: "chaty-5e326.firebaseapp.com",
  databaseURL: "https://chaty-5e326-default-rtdb.firebaseio.com",
  projectId: "chaty-5e326",
  storageBucket: "chaty-5e326.appspot.com",
  messagingSenderId: "305985443091",
  appId: "1:305985443091:web:314310d63adc299c1cb6e6"
};


const app = initializeApp(firebaseConfig);

export { getAuth, createUserWithEmailAndPassword, updateProfile, getDatabase, ref, set, signInWithEmailAndPassword, signOut, push, onValue, child, onChildAdded, onChildChanged }