// src/pages/EditProfilePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './EditProfilePage.css'; // O estilo CSS existente funcionará

const EditProfilePage = () => {
  // O estado 'profile' agora guardará todos os dados
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [skillsInput, setSkillsInput] = useState(''); // Estado separado para o campo de texto das skills
  const navigate = useNavigate();

  // 1. Carrega os dados atuais do perfil E A ROLE
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile(data); // Salva o objeto de perfil inteiro (incluindo a role)
          
          // Se for freelancer, prepara o campo de skills
          if (data.role === 'freelancer' && data.skills) {
            setSkillsInput(data.skills.join(', '));
          }
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  // 2. Função genérica para atualizar qualquer campo do perfil
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  // Função para lidar com a entrada de skills
  const handleSkillsChange = (e) => {
    setSkillsInput(e.target.value);
    // Converte a string "JS, React" em ["JS", "React"]
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
    setProfile(prev => ({ ...prev, skills: skillsArray }));
  };

  // 3. Salva o objeto 'profile' atualizado no Firebase
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      try {
        // Prepara os dados para salvar
        const dataToSave = { ...profile };
        // Remove campos que não queremos salvar diretamente
        delete dataToSave.role; // Não permitimos mudar a role por aqui
        delete dataToSave.email; // Não permitimos mudar o email por aqui
        
        await updateDoc(docRef, dataToSave);
        alert("Perfil atualizado com sucesso!");
        navigate('/profile'); // Redireciona de volta para a página de perfil
      } catch (error) {
        console.error("Erro ao salvar o perfil: ", error);
        alert("Falha ao salvar o perfil.");
      }
    }
    setIsSaving(false);
  };

  if (loading || !profile) {
    return <div className="loading-screen">Carregando...</div>;
  }

  // --- RENDERIZAÇÃO CONDICIONAL ---
  
  // Formulário para Freelancer
  const renderFreelancerForm = () => (
    <>
      <div className="form-group">
        <label htmlFor="displayName">Nome Completo</label>
        <input type="text" id="displayName" name="displayName" value={profile.displayName || ''} onChange={handleChange} placeholder="Seu nome completo" />
      </div>
      <div className="form-group">
        <label htmlFor="specialty">Especialidade Principal</label>
        <input type="text" id="specialty" name="specialty" value={profile.specialty || ''} onChange={handleChange} placeholder="Ex: Chef de Cozinha, Bartender" />
      </div>
      <div className="form-group">
        <label htmlFor="city">Cidade</label>
        <input type="text" id="city" name="city" value={profile.city || ''} onChange={handleChange} placeholder="Ex: Sorocaba, SP" />
      </div>
      <div className="form-group">
        <label htmlFor="bio">Sobre (Bio)</label>
        <textarea id="bio" name="bio" value={profile.bio || ''} onChange={handleChange} rows="6" placeholder="Fale um pouco sobre sua experiência..." />
      </div>
      <div className="form-group">
        <label htmlFor="skills">Habilidades (separadas por vírgula)</label>
        <input type="text" id="skills" name="skillsInput" value={skillsInput} onChange={handleSkillsChange} placeholder="Ex: Comfort Food, Cozinha Brasileira" />
      </div>
    </>
  );

  // Formulário para Empresa
  const renderCompanyForm = () => (
    <>
      <div className="form-group">
        <label htmlFor="displayName">Nome da Empresa</label>
        <input type="text" id="displayName" name="displayName" value={profile.displayName || ''} onChange={handleChange} placeholder="Nome do seu restaurante ou buffet" />
      </div>
      <div className="form-group">
        <label htmlFor="field">Ramo de Atuação</label>
        <input type="text" id="field" name="field" value={profile.field || ''} onChange={handleChange} placeholder="Ex: Restaurante Contemporâneo, Buffet de Eventos" />
      </div>
      <div className="form-group">
        <label htmlFor="location">Localização (Cidade, Estado)</label>
        <input type="text" id="location" name="location" value={profile.location || ''} onChange={handleChange} placeholder="Ex: Sorocaba, SP" />
      </div>
      <div className="form-group">
        <label htmlFor="bio">Descrição da Empresa</label>
        <textarea id="bio" name="bio" value={profile.bio || ''} onChange={handleChange} rows="6" placeholder="Fale um pouco sobre seu estabelecimento..."/>
      </div>
    </>
  );

  return (
    <div className="dashboard-page edit-profile-page">
      <h1 className="page-header">Editar Perfil</h1>
      <form className="edit-profile-form" onSubmit={handleSave}>
        
        {/* Renderiza o formulário correto baseado na role */}
        {profile.role === 'freelancer' ? renderFreelancerForm() : renderCompanyForm()}

        <button type="submit" className="save-button" disabled={isSaving}>
          {isSaving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;