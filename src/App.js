// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth, db } from './firebase/config';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import './index.css';

import AuthPage from './components/auth/AuthPage';
import FreelancerDashboard from './components/dashboard/FreelancerDashboard';
import CompanyDashboard from './components/dashboard/CompanyDashboard';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/layout/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // LÓGICA DO MODO ESCURO
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

  const handleLogout = () => {
    auth.signOut();
  };

  if (loading) {
    return <div className="loading-screen">Carregando iFree...</div>;
  }

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
              </>
            )}
            <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;