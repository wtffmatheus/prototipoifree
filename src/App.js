// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth, db } from './firebase/config';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import './index.css';

import AuthPage from './components/auth/AuthPage';
import FreelancerDashboard from './components/dashboard/FreelancerDashboard';
import CompanyDashboard from './components/dashboard/CompanyDashboard';
import ProfilePage from './pages/ProfilePage';
import MyJobsPage from './pages/MyJobsPage';
import EditProfilePage from './pages/EditProfilePage';
import Navbar from './components/layout/Navbar';

// IMPORTA OS DADOS FICTÍCIOS (NECESSÁRIO PARA O BOTÃO)
import { mockFreelancers, mockCompanies, mockVagas, mockReviews, mockApplications } from './data/mockData';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark-mode' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme);
  }, [theme]);

  // --- FUNÇÃO PARA POPULAR O BANCO DE DADOS (ADICIONADA DE VOLTA) ---
  const seedDatabase = async () => {
    console.log("--- INICIANDO DIAGNÓSTICO DO SCRIPT ---");
    const vagaIdMap = {};

    try {
      console.log("Inserindo Freelancers...");
      for (const uid in mockFreelancers) {
        console.log("-> Inserindo usuário com UID:", uid);
        await setDoc(doc(db, "users", uid), mockFreelancers[uid]);
      }
      console.log("✅ Freelancers inseridos!");

      console.log("Inserindo Empresas...");
      for (const uid in mockCompanies) {
        console.log("-> Inserindo empresa com UID:", uid);
        await setDoc(doc(db, "users", uid), mockCompanies[uid]);
      }
      console.log("✅ Empresas inseridas!");

      console.log("Inserindo Vagas...");
      let vagaCounter = 101;
      for (const vaga of mockVagas) {
        const vagaRef = await addDoc(collection(db, "vagas"), { ...vaga, criadoEm: serverTimestamp() });
        const mockVagaId = `vaga_${vagaCounter}`;
        vagaIdMap[mockVagaId] = vagaRef.id;
        vagaCounter++;
      }
      console.log("✅ Vagas inseridas!");

      console.log("Inserindo Avaliações (Reviews)...");
      for (const freelancerId in mockReviews) {
        const reviews = mockReviews[freelancerId];
        for (const review of reviews) {
          await addDoc(collection(db, "users", freelancerId, "reviews"), { ...review, createdAt: serverTimestamp() });
        }
      }
      console.log("✅ Avaliações inseridas!");
      
      console.log("Inserindo Candidaturas Fictícias...");
      for (const app of mockApplications) {
        const realVagaId = vagaIdMap[app.vagaId];
        if (realVagaId) {
          const candidaturaRef = doc(db, "vagas", realVagaId, "candidaturas", app.freelancerId);
          await setDoc(candidaturaRef, {
            freelancerId: app.freelancerId,
            freelancerEmail: mockFreelancers[app.freelancerId].email,
            freelancerName: mockFreelancers[app.freelancerId].displayName,
            appliedAt: serverTimestamp(),
            status: app.status
          });

          const userAppRef = doc(db, "users", app.freelancerId, "myApplications", realVagaId);
          await setDoc(userAppRef, {
            vagaId: realVagaId,
            status: app.status,
            titulo: app.vagaTitulo,
            companyName: app.companyName,
            dataEvento: app.dataEvento,
            remuneracao: app.remuneracao
          });
        }
      }
      console.log("✅ Candidaturas fictícias inseridas!");

      alert("Banco de dados populado com sucesso! Verifique o console para detalhes.");

    } catch (error) {
      console.error("❌ Erro ao popular o banco de dados:", error);
      alert("Erro ao popular o banco de dados. Verifique o console.");
    }
  };
  // -----------------------------------------------------------------

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser({ ...currentUser, role: docSnap.data().role });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const handleLogout = () => { auth.signOut(); };

  if (loading) { return <div className="loading-screen">Carregando iFree...</div>; }

  return (
    <Router>
      <div className="App">
        {user && <Navbar handleLogout={handleLogout} toggleTheme={toggleTheme} currentTheme={theme} />}
        <main className="main-content">
          <Routes>
            {!user ? (
              <Route path="/auth" element={<AuthPage />} />
            ) : (
              <>
                {user.role === 'freelancer' && <Route path="/" element={<FreelancerDashboard />} />}
                {user.role === 'company' && <Route path="/" element={<CompanyDashboard />} />}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/my-jobs" element={<MyJobsPage />} />
                <Route path="/profile-edit" element={<EditProfilePage />} />
              </>
            )}
            <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
          </Routes>
        </main>

        {/* --- BOTÃO ADICIONADO DE VOLTA AQUI --- */}
        {!user && (
          <button onClick={seedDatabase} style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            padding: '10px 15px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}>
            Popular Banco de Dados
          </button>
        )}
      </div>
    </Router>
  );
}

export default App;