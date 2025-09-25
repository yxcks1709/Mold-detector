// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // para Realtime DB
// import { getFirestore } from "firebase/firestore"; // para Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCI9PT-EYwWohWb-D-CGjjvxDYtvqN3qyM",
  authDomain: "mold-detector-f5b34.firebaseapp.com",
  databaseURL: "https://mold-detector-f5b34-default-rtdb.firebaseio.com",
  projectId: "mold-detector-f5b34",
  storageBucket: "mold-detector-f5b34.firebasestorage.app",
  messagingSenderId: "813557569184",
  appId: "1:813557569184:web:05047047fe90382103dbc5",
  measurementId: "G-Y5W9DVVEMT"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
// export const firestore = getFirestore(app); // si usas Firestore
