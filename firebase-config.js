// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJ9YsFw-HNh1wieDKRvOzA_bQiO_uYNOE",
  authDomain: "chat-app-dd587.firebaseapp.com",
  projectId: "chat-app-dd587",
  storageBucket: "chat-app-dd587.appspot.com",
  messagingSenderId: "103239208652",
  appId: "1:103239208652:web:c974550164bd700455bc69"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();