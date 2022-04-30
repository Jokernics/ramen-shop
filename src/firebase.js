import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "test-2c688.firebaseapp.com",
  projectId: "test-2c688",
  storageBucket: "test-2c688.appspot.com",
  messagingSenderId: "738387334239",
  appId: "1:738387334239:web:3aca38749293d46210f7ea"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth()
export const storage = getStorage(app);