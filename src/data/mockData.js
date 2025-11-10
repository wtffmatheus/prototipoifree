// src/data/mockData.js
module.exports = {
  
  mockFreelancers: {
    'wRv17KpuDsXQ4JINr1jpaHICgrJ2': {
      uid: 'wRv17KpuDsXQ4JINr1jpaHICgrJ2',
      email: 'nerdajaketrindadedasilva@gmail.com',
      role: 'freelancer',
      displayName: 'Jake Trindade',
      specialty: 'Chef de Partie & Especialista em Comfort Food',
      level: 'Pleno',
      rating: 4.8,
      city: 'Sorocaba, SP',
      bio: "Formado em Gastronomia, sou um cozinheiro apaixonado pela arte de transformar ingredientes simples em pratos que contam uma história. Tenho 4 anos de experiência, com foco em Comfort Food e Cozinha Brasileira. Sou ágil, organizado e busco oportunidades para colaborar em eventos e restaurantes que valorizem a qualidade.",
      skills: ["Comfort Food", "Cozinha Brasileira", "Garde Manger", "Molhos", "Organização de Praça"]
    },
    'fl_ana_santos': {
      uid: 'fl_ana_santos',
      email: 'ana.santos.freela@email.com',
      role: 'freelancer',
      displayName: 'Ana Clara Santos',
      specialty: 'Chef de Cozinha (Fusion)',
      level: 'Sênior',
      rating: 4.9,
      city: 'Sorocaba, SP',
      bio: "Chef Sênior com 10 anos de experiência internacional, especializada em culinária asiática e sul-americana. Foco em liderança de equipe e criação de menus para eventos de alto padrão.",
      skills: ["Culinária Fusion", "Liderança de Cozinha", "Criação de Menu", "Controle de CMV"]
    },
    'fl_bruno_costa': {
      uid: 'fl_bruno_costa',
      email: 'bruno.costa.drinks@email.com',
      role: 'freelancer',
      displayName: 'Bruno Costa Lima',
      specialty: 'Bartender / Mixologista',
      level: 'Pleno',
      rating: 4.7,
      city: 'Campinas, SP',
      bio: "Mixologista criativo com 5 anos de experiência em bares e eventos. Especialista em drinks autorais e clássicos.",
      skills: ["Mixologia", "Drinks Autorais", "Atendimento ao Cliente"]
    },
    'fl_carla_melo': {
      uid: 'fl_carla_melo',
      email: 'carla.melo.service@email.com',
      role: 'freelancer',
      displayName: 'Carla Souza de Melo',
      specialty: 'Garçonete / Maître',
      level: 'Júnior',
      rating: 4.5,
      city: 'Sorocaba, SP',
      bio: "Profissional de atendimento com 2 anos de experiência. Focada em garantir a melhor experiência para o cliente.",
      skills: ["Atendimento ao Cliente", "Serviço de Vinhos", "Organização de Salão"]
    }
  },

  mockCompanies: {
    'emp_gourmet_hall': { uid: 'emp_gourmet_hall', email: 'marina.guedes@gourmethall.com', role: 'company', displayName: 'Gourmet Hall Eventos', field: 'Buffet e Organização de Eventos', location: 'Sorocaba, SP' },
    'emp_villa_bistro': { uid: 'emp_villa_bistro', email: 'ricardo.alves@villabistro.com', role: 'company', displayName: 'Villa Bistrô & Café', field: 'Restaurante Contemporâneo', location: 'Sorocaba, SP' }
  },

  // VALORES DE REMUNERAÇÃO AJUSTADOS PARA NÍVEIS MAIS REALISTAS
  mockVagas: [
    { 
      titulo: 'Chef de Cozinha (Sênior) para Casamento',
      remuneracao: 750, // Ajustado de 1200
      dataEvento: '2025-11-15', 
      companyId: 'emp_gourmet_hall', 
      companyName: 'Gourmet Hall Eventos', 
      location: 'Jd. Faculdade, Sorocaba - SP'
    },
    { 
      titulo: 'Bartender (Pleno) para Noite de Drinks',
      remuneracao: 300, // Ajustado de 450
      dataEvento: '2025-11-08', 
      companyId: 'emp_villa_bistro', 
      companyName: 'Villa Bistrô & Café', 
      location: 'Centro, Sorocaba - SP'
    },
    { 
      titulo: 'Garçom (Júnior) para Fim de Semana',
      remuneracao: 180, // Ajustado de 250
      dataEvento: '2025-11-01', 
      companyId: 'emp_villa_bistro', 
      companyName: 'Villa Bistrô & Café', 
      location: 'Campolim, Sorocaba - SP'
    },
    { 
      titulo: 'Confeiteira (Pleno) para Festival',
      remuneracao: 400, // Ajustado de 700
      dataEvento: '2025-12-07', 
      companyId: 'emp_villa_bistro', 
      companyName: 'Villa Bistrô & Café', 
      location: 'Centro, Sorocaba - SP'
    },
    { 
      titulo: 'Auxiliar de Cozinha (Urgente)',
      remuneracao: 150, // Ajustado de 200
      dataEvento: '2025-10-31', 
      companyId: 'emp_gourmet_hall', 
      companyName: 'Gourmet Hall Eventos', 
      location: 'Centro, Votorantim - SP'
    }
  ],

  mockReviews: {
    'wRv17KpuDsXQ4JINr1jpaHICgrJ2': [
      { rating: 5, companyName: 'Villa Bistrô & Café', comment: 'Jake foi excepcional! Extremamente profissional, pontual e seus pratos foram um sucesso.' },
      { rating: 4, companyName: 'Gourmet Hall Eventos', comment: 'Bom cozinheiro, se adaptou bem à equipe.' },
      { rating: 5, companyName: 'Fazenda Imperial', comment: 'Organizado e ágil. Liderou a praça fria sem nenhum problema.' }
    ],
    'fl_ana_santos': [
      { rating: 5, companyName: 'Gourmet Hall Eventos', comment: 'Contratamos a Ana para um casamento e foi a melhor decisão.' },
      { rating: 3, companyName: 'Villa Bistrô & Café', comment: 'Boa profissional, mas atrasou 30 minutos.' }
    ],
    'fl_carla_melo': [
      { rating: 5, companyName: 'Villa Bistrô & Café', comment: 'Atendimento impecável, muito carismática.' },
      { rating: 2, companyName: 'Gourmet Hall Eventos', comment: 'Parecia um pouco perdida com o volume do evento.' }
    ]
  },

  // DADOS DE CANDIDATURAS ATUALIZADOS COM NOVOS VALORES
  mockApplications: [
    { 
      vagaId: 'vaga_102', 
      vagaTitulo: 'Bartender (Pleno) para Noite de Drinks', 
      companyName: 'Villa Bistrô & Café', 
      dataEvento: '2025-11-08', 
      remuneracao: 300, // Ajustado
      freelancerId: 'wRv17KpuDsXQ4JINr1jpaHICgrJ2', 
      status: 'em análise' 
    },
    { 
      vagaId: 'vaga_101', 
      vagaTitulo: 'Chef de Cozinha (Sênior) para Casamento', 
      companyName: 'Gourmet Hall Eventos', 
      dataEvento: '2025-11-15', 
      remuneracao: 750, // Ajustado
      freelancerId: 'wRv17KpuDsXQ4JINr1jpaHICgrJ2', 
      status: 'aprovado' 
    },
    { 
      vagaId: 'vaga_105', 
      vagaTitulo: 'Auxiliar de Cozinha (Urgente)', 
      companyName: 'Gourmet Hall Eventos', 
      dataEvento: '2025-10-31', 
      remuneracao: 150, // Ajustado
      freelancerId: 'fl_ana_santos', 
      status: 'concluído' 
    }
  ]
};