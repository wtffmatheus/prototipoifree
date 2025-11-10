// src/components/dashboard/CompanyDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa o Link
import { auth, db } from '../../firebase/config';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import './Dashboard.css';
import './CompanyDashboard.css';

const CompanyDashboard = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "vagas"), where("companyId", "==", user.uid));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      setLoading(true);
      const vagasDaEmpresa = [];
      for (const doc of querySnapshot.docs) {
        const vagaData = { id: doc.id, ...doc.data() };
        const candidaturasRef = collection(db, "vagas", doc.id, "candidaturas");
        const candidaturasSnap = await getDocs(candidaturasRef);
        vagaData.candidateCount = candidaturasSnap.size; 
        vagasDaEmpresa.push(vagaData);
      }
      setVagas(vagasDaEmpresa);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading-screen">Carregando minhas vagas...</div>;
  }

  return (
    <div className="dashboard-page company-dashboard">
      <h1 className="page-header">Minhas Vagas Publicadas</h1>
      
      {/* BOTÃO AGORA É UM LINK FUNCIONAL */}
      <Link to="/create-job" className="post-vaga-button">+ Postar Nova Vaga</Link>

      {vagas.length === 0 ? (
        <p>Você ainda não publicou nenhuma vaga.</p>
      ) : (
        <div className="vagas-grid">
          {vagas.map(vaga => (
            // CARD AGORA É UM LINK PARA A PÁGINA DE CANDIDATOS
            <Link key={vaga.id} to={`/job/${vaga.id}/candidates`} className="company-vaga-card-link">
              <div className="company-vaga-card">
                <div>
                  <h4>{vaga.titulo}</h4>
                  <p><strong>Data:</strong> {new Date(vaga.dataEvento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                  <p><strong>Local:</strong> {vaga.location || 'A definir'}</p>
                </div>
                <div className="candidates-count">
                  <div className="count">{vaga.candidateCount}</div>
                  <div className="label">Candidaturas</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};



export default CompanyDashboard;
