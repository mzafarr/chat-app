// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgBT3ia36MILf-k07Ue1eHGjpKK_sBMkM",
  authDomain: "chat-app-e7996.firebaseapp.com",
  projectId: "chat-app-e7996",
  storageBucket: "chat-app-e7996.appspot.com",
  messagingSenderId: "218712203047",
  appId: "1:218712203047:web:458d24497d057395d4d302"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();