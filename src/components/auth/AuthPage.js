// src/components/auth/AuthPage.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

import { auth, db } from '../../firebase/config';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleGoogleLogin = async () => {
    // Adicionamos console.logs para depuração
    console.log("Iniciando login com Google...");
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Pop-up do Google bem-sucedido! Usuário autenticado:", user.email);

      const docRef = doc(db, "users", user.uid);
      console.log("Verificando se o usuário já existe no Firestore...");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log("Usuário é novo. Criando documento no Firestore...");
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'freelancer'
        });
        console.log("Documento do novo usuário criado com sucesso!");
      } else {
        console.log("Usuário já existe no Firestore. Login irá proceder.");
      }
      // Se tudo deu certo, o App.js deve detectar a mudança e redirecionar.
      console.log("Processo de login com Google finalizado. Aguardando redirecionamento...");

    } catch (error) {
      // Isso mostrará qualquer erro que ocorrer durante o processo
      console.error("ERRO DETALHADO no login com Google:", error);
      alert("Ocorreu um erro ao tentar fazer login com o Google. Verifique o console para mais detalhes.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* ... o resto do seu JSX continua o mesmo ... */}
        <div className="auth-header">
          <h1>Bem-vindo ao iFree</h1>
          <p>Conectando talentos da gastronomia a grandes oportunidades.</p>
        </div>
        {isLoginView ? <Login /> : <Register />}
        <div className="auth-separator">
          <span>OU</span>
        </div>
        <button onClick={handleGoogleLogin} className="google-auth-button">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon" />
          Continuar com o Google
        </button>
        <div className="auth-toggle">
          {isLoginView ? (
            <p>Não tem uma conta? <span onClick={() => setIsLoginView(false)}>Cadastre-se</span></p>
          ) : (
            <p>Já tem uma conta? <span onClick={() => setIsLoginView(true)}>Faça login</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;