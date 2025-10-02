// Firebase Configuration for Knowledge Development Stationery
// Replace with your actual Firebase config

const firebaseConfig = {
  apiKey: "AIzaSyDTlezN3jxgFytRj_NbltV4sOgwpCLlhhk",
  authDomain: "stationery-website-37a02.firebaseapp.com",
  projectId: "stationery-website-37a02",
  storageBucket: "stationery-website-37a02.firebasestorage.app",
  messagingSenderId: "921131993445",
  appId: "1:921131993445:web:6bf0a390721f2d61ef798c",
  measurementId: "G-D7X54VCW42"
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
