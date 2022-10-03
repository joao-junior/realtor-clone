import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyB81hcbZBb7TRWNSmO6KCpCl0jQTgQ40l4",
  authDomain: "realtor-clone-80beb.firebaseapp.com",
  projectId: "realtor-clone-80beb",
  storageBucket: "realtor-clone-80beb.appspot.com",
  messagingSenderId: "592475106087",
  appId: "1:592475106087:web:a4e98179b710713c8bd702"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()