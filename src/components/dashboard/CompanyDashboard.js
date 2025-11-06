// src/components/dashboard/CompanyDashboard.js
import React, { useState } from 'react';
import { db, auth } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CompanyDashboard = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [remuneracao, setRemuneracao] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePostVaga = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!auth.currentUser) {
      setError("Você precisa estar logado para postar uma vaga.");
      return;
    }

    try {
      // Adiciona um novo documento na coleção "vagas"
      await addDoc(collection(db, "vagas"), {
        titulo: titulo,
        descricao: descricao,
        remuneracao: Number(remuneracao), // Salva como número
        dataEvento: dataEvento,
        companyId: auth.currentUser.uid, // Linka a vaga ao usuário atual
        criadoEm: serverTimestamp() // Pega a data/hora do servidor
      });

      setSuccess("Vaga postada com sucesso!");
      // Limpa o formulário
      setTitulo('');
      setDescricao('');
      setRemuneracao('');
      setDataEvento('');

    } catch (err) {
      console.error("Erro ao postar vaga: ", err);
      setError("Ocorreu um erro ao postar a vaga. Tente novamente.");
    }
  };

  return (
    <div>
      <h2>Dashboard da Empresa</h2>
      <hr />
      <h3>Postar Nova Vaga</h3>
      <form onSubmit={handlePostVaga}>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título da Vaga"
          required
        />
        <br />
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição da vaga"
          required
        ></textarea>
        <br />
        <input
          type="number"
          value={remuneracao}
          onChange={(e) => setRemuneracao(e.target.value)}
          placeholder="Remuneração (R$)"
          required
        />
        <br />
        <input
          type="date"
          value={dataEvento}
          onChange={(e) => setDataEvento(e.target.value)}
          required
        />
        <br />
        <button type="submit">Postar Vaga</button>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default CompanyDashboard;