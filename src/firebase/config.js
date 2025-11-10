
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWfq_Nf7ahQoIVflD0CqS8_GWdO-JszjI",
  authDomain: "ifree-ab709.firebaseapp.com",
  projectId: "ifree-ab709",
  storageBucket: "ifree-ab709.appspot.com",
  messagingSenderId: "313330203623",
  appId: "1:313330203623:web:52ac0425474dbb533d1b42",
  measurementId: "G-67J9ZBB2XV"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);