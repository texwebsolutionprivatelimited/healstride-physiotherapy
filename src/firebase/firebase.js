import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzMxs16FvQLH1uqldb7Bie0vULFvM7xbc",
  authDomain: "heal-stride.firebaseapp.com",
  projectId: "heal-stride",
  storageBucket: "heal-stride.firebasestorage.app",
  messagingSenderId: "445157108628",
  appId: "1:445157108628:web:560ba86775131196a63d81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;