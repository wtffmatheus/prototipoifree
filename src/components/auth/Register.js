// src/components/auth/Register.js
import React, { useState } from 'react';
import { auth, db } from '../../firebase/config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('freelancer');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        role: userType
      });
    } catch (err) {
      const errorCode = err.code;
      let errorMessage = "Ocorreu um erro ao criar a conta.";
      if (errorCode === 'auth/email-already-in-use') {
        errorMessage = "Este email já está cadastrado.";
      } else if (errorCode === 'auth/weak-password') {
        errorMessage = "A senha precisa ter no mínimo 6 caracteres.";
      }
      setError(errorMessage);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleRegister}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha (mínimo 6 caracteres)"
        required
      />
      <div className="user-type-selector">
        <label>
          <input type="radio" value="freelancer" checked={userType === 'freelancer'} onChange={() => setUserType('freelancer')} />
          <span>Sou Freelancer</span>
        </label>
        <label>
          <input type="radio" value="company" checked={userType === 'company'} onChange={() => setUserType('company')} />
          <span>Sou Empresa</span>
        </label>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="auth-button">Cadastrar</button>
    </form>
  );
};

export default Register;