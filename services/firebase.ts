import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnd5uPKtOgjTgjXfoQgaNMsB8pSym9kKI",
  authDomain: "nursing-declan.firebaseapp.com",
  projectId: "nursing-declan",
  storageBucket: "nursing-declan.firebasestorage.app",
  messagingSenderId: "693386476485",
  appId: "1:693386476485:web:713ed9b5dd866f132669ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
