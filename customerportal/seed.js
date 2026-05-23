import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
          apiKey: "AIzaSyAQhLWiLlAx8p1frdpyF64JzMkBGarYqrw",
          authDomain: "digital-hippo-49186.firebaseapp.com",
          projectId: "digital-hippo-49186",
          storageBucket: "digital-hippo-49186.firebasestorage.app",
          messagingSenderId: "1092483916399",
          appId: "1:1092483916399:web:027190b76220449f9de39a",
          measurementId: "G-BCM94D1W3M"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

