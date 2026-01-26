
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// These variables should be set in your Netlify Environment Variables settings
// If not set, the app will fall back to local storage automatically
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Check if we have at least the API Key to attempt initialization
const isFirebaseConfigured = !!process.env.VITE_FIREBASE_API_KEY;

let db: any = null;

if (isFirebaseConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase Cloud Storage Initialized");
  } catch (error) {
    console.error("Firebase Initialization Error:", error);
  }
}

export { db, isFirebaseConfigured };
