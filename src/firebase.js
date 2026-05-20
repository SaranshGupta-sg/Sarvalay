import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAt_QK8gvfm0T49mcSik1EcSlHxM6jXMVc",
  authDomain: "sarvalay-98f4e.firebaseapp.com",
  databaseURL:
    "https://sarvalay-98f4e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sarvalay-98f4e",
  storageBucket: "sarvalay-98f4e.firebasestorage.app",
  messagingSenderId: "963251403450",
  appId: "1:963251403450:web:85c01fc6fa9b3905002083",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);