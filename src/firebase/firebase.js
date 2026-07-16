import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzMxsl6FvQLH1uqldb7Bie0vULFvM7xbc",
  authDomain: "heal-stride.firebaseapp.com",
  projectId: "heal-stride",
  storageBucket: "heal-stride.firebasestorage.app",
  messagingSenderId: "445157108628",
  appId: "1:445157108628:web:e0b7cef7f0ef5fc1a63d81",
};

const app =
  getApps().length
    ? getApp()
    : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;