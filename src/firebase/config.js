// src/firebase/config.js

// 1. Importa as funções necessárias do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 2. A configuração do seu app (as chaves que conectam ao seu projeto)
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWfq_Nf7ahQoIVflD0CqS8_GWdO-JszjI",
  authDomain: "ifree-ab709.firebaseapp.com",
  projectId: "ifree-ab709",
  storageBucket: "ifree-ab709.appspot.com",
  messagingSenderId: "313330203623",
  appId: "1:313330203623:web:52ac0425474dbb533d1b42",
  measurementId: "G-67J9ZBB2XV"
};

// 3. Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// 4. Exporta os serviços que você vai usar no resto do seu app (Autenticação e Banco de Dados)
export const auth = getAuth(app);
export const db = getFirestore(app);