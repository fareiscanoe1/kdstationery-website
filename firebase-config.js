// Firebase Configuration for Knowledge Development Stationery
// Replace with your actual Firebase config

const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "kdstationery-website.firebaseapp.com",
  projectId: "kdstationery-website",
  storageBucket: "kdstationery-website.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// For development - connect to emulators if running locally
if (location.hostname === 'localhost') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectStorageEmulator(storage, 'localhost', 9199);
  } catch (error) {
    console.log('Emulators already connected or not available');
  }
}

export default app;
