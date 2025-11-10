// src/pages/ManageCandidatesPage.js
import React, { useState, useEffect } from 'react';
// A CORREÇÃO ESTÁ AQUI: Removemos o 'Link' da linha abaixo
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc, collection, onSnapshot, updateDoc } from 'firebase/firestore';
import './ManageCandidatesPage.css';

const ManageCandidatesPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega os dados da Vaga e os candidatos dela
  useEffect(() => {
    setLoading(true);
    // 1. Busca os detalhes da vaga
    const jobRef = doc(db, "vagas", jobId);
    getDoc(jobRef).then(docSnap => {
      if (docSnap.exists()) {
        setJob(docSnap.data());
      }
    });

    // 2. Ouve em tempo real as candidaturas
    const candidatesRef = collection(db, "vagas", jobId, "candidaturas");
    const unsubscribe = onSnapshot(candidatesRef, (querySnapshot) => {
      const cands = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCandidates(cands);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [jobId]);

  const handleUpdateStatus = async (freelancerId, newStatus) => {
    try {
      // 1. Atualiza o status na subcoleção da vaga
      const vagaCandidaturaRef = doc(db, "vagas", jobId, "candidaturas", freelancerId);
      await updateDoc(vagaCandidaturaRef, { status: newStatus });

      // 2. Atualiza o status na subcoleção do usuário (para a página "Meus Jobs" dele)
      const userApplicationRef = doc(db, "users", freelancerId, "myApplications", jobId);
      await updateDoc(userApplicationRef, { status: newStatus });

      alert(`Freelancer ${newStatus === 'aprovado' ? 'aprovado' : 'recusado'}!`);
    } catch (error) {
      console.error("Erro ao atualizar status: ", error);
      alert("Erro ao atualizar status.");
    }
  };

  if (loading) {
    return <div className="loading-screen">Carregando candidatos...</div>;
  }

  return (
    <div className="dashboard-page">
      <h1 className="page-header">Gerenciar Candidatos</h1>
      <div className="job-summary-card">
        <h2>{job?.titulo}</h2>
        <p>{job?.location} | {new Date(job?.dataEvento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
      </div>
      
      <div className="candidates-list">
        {candidates.length === 0 ? (
          <p>Nenhum candidato para esta vaga ainda.</p>
        ) : (
          candidates.map(cand => (
            <div key={cand.id} className="candidate-card">
              <div className="candidate-info">
                <h4>{cand.freelancerName}</h4>
                <p>{cand.freelancerEmail}</p>
                <span className={`candidate-status status-${cand.status}`}>
                  {cand.status.replace('-', ' ')}
                </span>
              </div>
              <div className="candidate-actions">
                {cand.status === 'em análise' && (
                  <>
                    <button 
                      className="candidate-button reject"
                      onClick={() => handleUpdateStatus(cand.freelancerId, 'recusado')}
                    >
                      Recusar
                    </button>
                    <button 
                      className="candidate-button approve"
                      onClick={() => handleUpdateStatus(cand.freelancerId, 'aprovado')}
                    >
                      Aprovar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageCandidatesPage;