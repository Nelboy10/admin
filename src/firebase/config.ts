import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB2nKM0U5iZMIc7tWLBok9bwZ83RtQ01Lk",
  authDomain: "scan-fb91e.firebaseapp.com",
  projectId: "scan-fb91e",
  storageBucket: "scan-fb91e.appspot.com",
  messagingSenderId: "1030098054617",
  appId: "1:1030098054617:web:9363c8ca3e00f46b40fdc8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // 🔥 voici Firestore
