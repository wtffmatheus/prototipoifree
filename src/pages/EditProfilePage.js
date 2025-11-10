// src/pages/EditProfilePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './EditProfilePage.css'; // Estilo que vamos criar

const EditProfilePage = () => {
  const [profile, setProfile] = useState({
    displayName: '',
    specialty: '',
    city: '',
    bio: '',
    skills: []
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [skillsInput, setSkillsInput] = useState(''); // Campo de texto para as skills
  const navigate = useNavigate();

  // 1. Carrega os dados atuais do perfil
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            displayName: data.displayName || '',
            specialty: data.specialty || '',
            city: data.city || '',
            bio: data.bio || '',
            skills: data.skills || []
          });
          setSkillsInput(data.skills ? data.skills.join(', ') : ''); // Converte array em string
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  // Lógica para adicionar/remover skills
  const handleSkillsChange = (e) => {
    setSkillsInput(e.target.value);
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
    setProfile(prev => ({ ...prev, skills: skillsArray }));
  };

  // 2. Salva as alterações no Firebase
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(docRef, profile);
        alert("Perfil atualizado com sucesso!");
        navigate('/profile'); // Redireciona de volta para a página de perfil
      } catch (error) {
        console.error("Erro ao salvar o perfil: ", error);
        alert("Falha ao salvar o perfil.");
      }
    }
    setIsSaving(false);
  };

  if (loading) {
    return <div className="loading-screen">Carregando...</div>;
  }

  return (
    <div className="dashboard-page edit-profile-page">
      <h1 className="page-header">Editar Perfil</h1>
      <form className="edit-profile-form" onSubmit={handleSave}>
        
        <div className="form-group">
          <label htmlFor="displayName">Nome Completo</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={profile.displayName}
            onChange={handleChange}
            placeholder="Seu nome completo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialty">Especialidade Principal</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={profile.specialty}
            onChange={handleChange}
            placeholder="Ex: Chef de Cozinha, Bartender"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">Cidade</label>
          <input
            type="text"
            id="city"
            name="city"
            value={profile.city}
            onChange={handleChange}
            placeholder="Ex: Sorocaba, SP"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Sobre (Bio)</label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows="6"
            placeholder="Fale um pouco sobre sua experiência..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Habilidades (separadas por vírgula)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={skillsInput}
            onChange={handleSkillsChange}
            placeholder="Ex: Comfort Food, Cozinha Brasileira, Garde Manger"
          />
        </div>

        <button type="submit" className="save-button" disabled={isSaving}>
          {isSaving ? 'Salvando...' : 'Salvar Alterações'}
        </button>

      </form>
    </div>
  );
};

export default EditProfilePage;