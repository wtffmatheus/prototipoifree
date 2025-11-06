// src/components/dashboard/FreelancerDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { collection, query, orderBy, onSnapshot, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import Modal from '../common/Modal';
import SuccessModal from '../common/SuccessModal'; // IMPORTA O NOVO MODAL DE SUCESSO
import './Dashboard.css';

const FreelancerDashboard = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [appliedVagas, setAppliedVagas] = useState({});
  
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedVaga, setSelectedVaga] = useState(null);

  // Novos estados para o Modal de Sucesso
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) { setUserProfile(docSnap.data()); }
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "vagas"), orderBy("criadoEm", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setVagas(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleInitiateApply = (vaga) => {
    if (!userProfile) return;
    const isProfileComplete = userProfile.displayName && userProfile.specialty && userProfile.city;
    if (!isProfileComplete) {
      setIsProfileModalOpen(true);
      return;
    }
    setSelectedVaga(vaga);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmApply = async () => {
    const user = auth.currentUser;
    if (!user || !selectedVaga) return;

    const candidaturaRef = doc(db, "vagas", selectedVaga.id, "candidaturas", user.uid);
    try {
      await setDoc(candidaturaRef, {
        freelancerId: user.uid,
        freelancerEmail: userProfile.email,
        freelancerName: userProfile.displayName,
        appliedAt: serverTimestamp(),
        status: 'em análise'
      });

      setAppliedVagas(prev => ({ ...prev, [selectedVaga.id]: 'em análise' }));
      setSuccessMessage(`Sua candidatura para "${selectedVaga.titulo}" foi enviada e está em análise!`);
      setIsSuccessModalOpen(true); // Abre o modal de sucesso
    } catch (error) {
      console.error("Erro ao se candidatar:", error);
      alert("Ocorreu um erro ao enviar sua candidatura."); // Mantém o alerta genérico para erros
    } finally {
      setIsConfirmModalOpen(false);
      setSelectedVaga(null);
    }
  };

  if (loading || !userProfile) { return <div className="loading-screen">Carregando...</div>; }

  return (
    <div className="dashboard-page">
      <h1 className="page-header">Vagas Disponíveis</h1>

      <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
        <h2>Complete seu Perfil</h2>
        <p>Para se candidatar a uma vaga, você precisa primeiro completar suas informações básicas no seu perfil.</p>
        <Link to="/profile" className="modal-button-link">Ir para o Perfil</Link>
      </Modal>

      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
        <h2>Confirmação</h2>
        <p>Você tem certeza que deseja se candidatar para a vaga <strong>"{selectedVaga?.titulo}"</strong>?</p>
        <div className="modal-actions">
          <button className="modal-cancel-button" onClick={() => setIsConfirmModalOpen(false)}>Cancelar</button>
          <button className="modal-confirm-button" onClick={handleConfirmApply}>Confirmar</button>
        </div>
      </Modal>

      {/* NOVO MODAL DE SUCESSO ADICIONADO AQUI */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={successMessage}
        title="Candidatura Enviada!"
      />

      <div className="vagas-grid">
        {vagas.map(vaga => {
          const status = appliedVagas[vaga.id];
          return (
            <div key={vaga.id} className="vaga-card">
              <h4>{vaga.titulo}</h4>
              <p className="company-name">{vaga.companyName || 'Empresa Confidencial'}</p>
              <div className="vaga-info">
                <p className="vaga-detail">
                  <strong>Data:</strong> {new Date(vaga.dataEvento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                </p>
                <p className="vaga-detail">
                  <strong>Local:</strong> {vaga.location || 'A definir'}
                </p>
              </div>
              <p className="remuneration">
                R$ {Number(vaga.remuneracao).toFixed(2)}
              </p>
              <button
                className={`apply-button ${status ? 'in-analysis' : ''}`}
                onClick={() => handleInitiateApply(vaga)}
                disabled={!!status}
              >
                {status ? 'Em Análise' : 'Candidatar-se'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FreelancerDashboard;