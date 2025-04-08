import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCibFrAK-GCYyI_kq4u6aH3kUv70UoU8xo",
  authDomain: "voetbalshirtjes-tracker.firebaseapp.com",
  projectId: "voetbalshirtjes-tracker",
  storageBucket: "voetbalshirtjes-tracker.firebasestorage.app",
  messagingSenderId: "811349867321",
  appId: "1:811349867321:web:f82edb9acc459a8f7686e8",
  measurementId: "G-1PKCHNXSRH"
};

const app = initializeApp(firebaseConfig);

export default app;
