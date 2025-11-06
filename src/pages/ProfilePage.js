// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          console.error("Não foi encontrado um perfil para este usuário.");
        }
      }
      setLoading(false);
    };
    fetchProfileData();
  }, []);

  if (loading) {
    return <div className="loading-screen">Carregando perfil...</div>;
  }

  // Se o perfil não for encontrado, o layout ainda terá o espaçamento correto
  if (!profileData) {
    return (
      <div className="dashboard-page">
        <h1 className="page-header">Perfil não encontrado</h1>
      </div>
    );
  }

  const { displayName, email, role, specialty, level, rating, city, field, photoURL } = profileData;

  // A CORREÇÃO ESTÁ AQUI: As classes dashboard-page e page-header foram aplicadas
  // aos elementos corretos para garantir o layout.
  return (
    <div className="dashboard-page">
      <h1 className="page-header">Meu Perfil</h1>
      <div className="profile-card">
        <div className="profile-header">
          <img src={photoURL || `https://ui-avatars.com/api/?name=${displayName}&background=FF6B6B&color=fff&size=100`} alt="Foto do perfil" className="profile-avatar" />
          <div className="profile-info">
            <h2>{displayName}</h2>
            <p>{email}</p>
          </div>
        </div>
        <div className="profile-details">
          <h3>Detalhes</h3>
          <ul>
            <li><strong>Tipo de Conta:</strong> <span>{role === 'freelancer' ? 'Freelancer' : 'Empresa'}</span></li>
            {role === 'freelancer' && (
              <>
                <li><strong>Especialidade:</strong> <span>{specialty || 'Não informado'}</span></li>
                <li><strong>Nível:</strong> <span>{level || 'Não informado'}</span></li>
                <li><strong>Avaliação Média:</strong> <span>{rating ? `${rating} ★` : 'Não avaliado'}</span></li>
                <li><strong>Cidade:</strong> <span>{city || 'Não informada'}</span></li>
              </>
            )}
            {role === 'company' && (
              <li><strong>Ramo de Atuação:</strong> <span>{field || 'Não informado'}</span></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;