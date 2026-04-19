// ================= FIREBASE CONFIG =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

// ================= CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyAqMeHIAFosDuVwIMFnVVGYCX9O2x8IeVo",
  authDomain: "medico-legal-jurists.firebaseapp.com",
  projectId: "medico-legal-jurists",
  storageBucket: "medico-legal-jurists.firebasestorage.app",
  messagingSenderId: "534157643632",
  appId: "1:534157643632:web:cf6c18035c10b90ead49b5",
};

// ================= INITIALIZE =================
const app = initializeApp(firebaseConfig);

// ================= SERVICES =================
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // 🔥 IMPORTANT (for login/logout)

// ================= EXPORT =================
export { app, db, storage, auth };