// src/data/mockData.js

export const mockFreelancers = {
  'wRv17KpuDsXQ4JINr1jpaHICgrJ2': { uid: 'wRv17KpuDsXQ4JINr1jpaHICgrJ2', email: 'nerdajaketrindadedasilva@gmail.com', role: 'freelancer', displayName: 'Jake Trindade', specialty: 'Chef de Partie & Especialista em Comfort Food', level: 'Pleno', rating: 4.8, city: 'Sorocaba, SP' },
  'fl_ana_santos': { uid: 'fl_ana_santos', email: 'ana.santos.freela@email.com', role: 'freelancer', displayName: 'Ana Clara Santos', specialty: 'Chef de Cozinha (Fusion)', level: 'Sênior', rating: 4.9, city: 'Sorocaba, SP' },
  'fl_bruno_costa': { uid: 'fl_bruno_costa', email: 'bruno.costa.drinks@email.com', role: 'freelancer', displayName: 'Bruno Costa Lima', specialty: 'Bartender / Mixologista', level: 'Pleno', rating: 4.7, city: 'Campinas, SP' },
  'fl_carla_melo': { uid: 'fl_carla_melo', email: 'carla.melo.service@email.com', role: 'freelancer', displayName: 'Carla Souza de Melo', specialty: 'Garçonete / Maître', level: 'Júnior', rating: 4.5, city: 'Sorocaba, SP' }
};

export const mockCompanies = {
  'emp_gourmet_hall': { uid: 'emp_gourmet_hall', email: 'marina.guedes@gourmethall.com', role: 'company', displayName: 'Gourmet Hall Eventos', field: 'Buffet e Organização de Eventos', location: 'Sorocaba, SP' },
  'emp_villa_bistro': { uid: 'emp_villa_bistro', email: 'ricardo.alves@villabistro.com', role: 'company', displayName: 'Villa Bistrô & Café', field: 'Restaurante Contemporâneo', location: 'Sorocaba, SP' }
};

// VAGAS ATUALIZADAS COM BAIRRO, CIDADE E ESTADO
export const mockVagas = [
  {
    titulo: 'Chef de Cozinha para Casamento',
    descricao: 'Responsável pelo menu principal de um casamento para 150 pessoas.',
    remuneracao: 1200,
    dataEvento: '2025-11-15',
    companyId: 'emp_gourmet_hall',
    companyName: 'Gourmet Hall Eventos',
    location: 'Jd. Faculdade, Sorocaba - SP' // CAMPO ATUALIZADO
  },
  {
    titulo: 'Bartender para Noite de Drinks',
    descricao: 'Preparar drinks clássicos e autorais.',
    remuneracao: 450,
    dataEvento: '2025-11-08',
    companyId: 'emp_villa_bistro',
    companyName: 'Villa Bistrô & Café',
    location: 'Centro, Sorocaba - SP' // CAMPO ATUALIZADO
  },
  {
    titulo: 'Garçom para Fim de Semana',
    descricao: 'Atendimento ao público e servir mesas.',
    remuneracao: 250,
    dataEvento: '2025-11-01',
    companyId: 'emp_villa_bistro',
    companyName: 'Villa Bistrô & Café',
    location: 'Campolim, Sorocaba - SP' // CAMPO ATUALIZADO
  },
  {
    titulo: 'Confeiteira para Festival Doce',
    descricao: 'Produção de sobremesas finas para um festival de gastronomia.',
    remuneracao: 700,
    dataEvento: '2025-12-07',
    companyId: 'emp_villa_bistro',
    companyName: 'Villa Bistrô & Café',
    location: 'Centro, Sorocaba - SP' // CAMPO ATUALIZADO
  },
  {
    titulo: '2x Auxiliares de Cozinha Urgente',
    descricao: 'Apoio geral na cozinha para um evento de grande porte.',
    remuneracao: 200,
    dataEvento: '2025-10-31',
    companyId: 'emp_gourmet_hall',
    companyName: 'Gourmet Hall Eventos',
    location: 'Centro, Votorantim - SP' // CAMPO ATUALIZADO
  }
];