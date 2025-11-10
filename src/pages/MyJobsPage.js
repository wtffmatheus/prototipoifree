// src/pages/MyJobsPage.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import './MyJobsPage.css'; // Estilo que vamos criar
import '../components/dashboard/Dashboard.css'; // Reutiliza o estilo dos cards de vaga

const MyJobsPage = () => {
  const [activeTab, setActiveTab] = useState('em análise');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Busca as candidaturas na subcoleção 'myApplications' do usuário
    const q = query(
      collection(db, "users", user.uid, "myApplications"),
      orderBy("dataEvento", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedJobs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobs(fetchedJobs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filterJobs = (status) => {
    return jobs.filter(job => job.status === status);
  };

  const renderJobList = (jobList) => {
    if (jobList.length === 0) {
      return <p className="no-jobs-message">Nenhum job encontrado nesta categoria.</p>;
    }
    
    return (
      <div className="vagas-grid">
        {jobList.map(job => (
          <div key={job.id} className="vaga-card">
            <h4>{job.titulo}</h4>
            <p className="company-name">{job.companyName}</p>
            <div className="vaga-info">
              <p className="vaga-detail">
                <strong>Data:</strong> {new Date(job.dataEvento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
              </p>
            </div>
            <p className="remuneration">
              R$ {Number(job.remuneracao).toFixed(2)}
            </p>
            <div className={`job-status-badge status-${job.status}`}>
              {job.status.replace('-', ' ')}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const jobsToDisplay = filterJobs(activeTab);

  return (
    <div className="dashboard-page">
      <h1 className="page-header">Meus Jobs</h1>
      
      <div className="tabs-container">
        <button 
          className={`tab-button ${activeTab === 'em análise' ? 'active' : ''}`}
          onClick={() => setActiveTab('em análise')}
        >
          Em Análise
        </button>
        <button 
          className={`tab-button ${activeTab === 'aprovado' ? 'active' : ''}`}
          onClick={() => setActiveTab('aprovado')}
        >
          Aprovados
        </button>
        <button 
          className={`tab-button ${activeTab === 'concluído' ? 'active' : ''}`}
          onClick={() => setActiveTab('concluído')}
        >
          Concluídos
        </button>
      </div>

      <div className="tab-content">
        {loading ? <p>Carregando jobs...</p> : renderJobList(jobsToDisplay)}
      </div>
    </div>
  );
};

export default MyJobsPage;