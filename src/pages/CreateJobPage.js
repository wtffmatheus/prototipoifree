// src/pages/CreateJobPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './EditProfilePage.css'; // Reutiliza o estilo do formulário de "Editar Perfil"

const CreateJobPage = () => {
  const [job, setJob] = useState({
    titulo: '',
    category: 'Cozinha',
    jobType: 'Diária',
    remuneracao: '',
    location: '',
    dataEvento: '',
    descricao: '',
    skills: []
  });
  const [skillsInput, setSkillsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    setSkillsInput(e.target.value);
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
    setJob(prev => ({ ...prev, skills: skillsArray }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const user = auth.currentUser;
    if (!user) {
      setIsSaving(false);
      return;
    }

    try {
      await addDoc(collection(db, "vagas"), {
        ...job,
        remuneracao: Number(job.remuneracao),
        companyId: user.uid,
        companyName: user.displayName || 'Empresa Anônima',
        criadoEm: serverTimestamp()
      });
      alert("Vaga criada com sucesso!");
      navigate('/'); // Redireciona para o dashboard da empresa
    } catch (error) {
      console.error("Erro ao criar vaga: ", error);
      alert("Falha ao criar vaga.");
    }
    setIsSaving(false);
  };

  return (
    <div className="dashboard-page edit-profile-page">
      <h1 className="page-header">Postar Nova Vaga</h1>
      <form className="edit-profile-form" onSubmit={handleSave}>
        
        <div className="form-group">
          <label htmlFor="titulo">Título da Vaga</label>
          <input type="text" id="titulo" name="titulo" value={job.titulo} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select id="category" name="category" value={job.category} onChange={handleChange}>
            <option value="Cozinha">Cozinha</option>
            <option value="Bar">Bar</option>
            <option value="Salão">Salão</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="jobType">Tipo de Vaga</label>
          <select id="jobType" name="jobType" value={job.jobType} onChange={handleChange}>
            <option value="Diária">Diária (Evento Único)</option>
            <option value="Temporário">Temporário (Período)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="remuneracao">Remuneração (R$)</label>
          <input type="number" id="remuneracao" name="remuneracao" value={job.remuneracao} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="dataEvento">Data do Evento</label>
          <input type="date" id="dataEvento" name="dataEvento" value={job.dataEvento} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Localização (Bairro, Cidade - Estado)</label>
          <input type="text" id="location" name="location" value={job.location} onChange={handleChange} placeholder="Ex: Campolim, Sorocaba - SP" required />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Habilidades Exigidas (separadas por vírgula)</label>
          <input type="text" id="skills" name="skills" value={skillsInput} onChange={handleSkillsChange} placeholder="Ex: Liderança, Agilidade" />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição da Vaga</label>
          <textarea id="descricao" name="descricao" value={job.descricao} onChange={handleChange} rows="6" placeholder="Descreva as responsabilidades..." />
        </div>

        <button type="submit" className="save-button" disabled={isSaving}>
          {isSaving ? 'Publicando...' : 'Publicar Vaga'}
        </button>

      </form>
    </div>
  );
};

export default CreateJobPage;