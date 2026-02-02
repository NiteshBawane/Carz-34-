
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// These variables are pulled from Vercel's Environment Variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Check if we have the configuration
const isFirebaseConfigured = !!process.env.VITE_FIREBASE_API_KEY;

let db: any = null;

if (isFirebaseConfigured) {
  try {
    // Prevent double initialization
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase Cloud Storage Active (Vercel Build)");
  } catch (error) {
    console.error("Firebase Initialization Error:", error);
  }
}

export { db, isFirebaseConfigured };
