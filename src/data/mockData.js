// src/data/mockData.js
module.exports = {
  
  mockFreelancers: {
    'wRv17KpuDsXQ4JINr1jpaHICgrJ2': { /* ... Perfil do Jake Trindade ... */ 
      uid: 'wRv17KpuDsXQ4JINr1jpaHICgrJ2', email: 'nerdajaketrindadedasilva@gmail.com', role: 'freelancer', displayName: 'Jake Trindade', specialty: 'Chef de Partie & Especialista em Comfort Food', level: 'Pleno', rating: 4.8, city: 'Sorocaba, SP', bio: "Formado em Gastronomia...", skills: ["Comfort Food", "Cozinha Brasileira", "Garde Manger", "Molhos"]
    },
    'fl_ana_santos': { /* ... Perfil da Ana Santos ... */ 
      uid: 'fl_ana_santos', email: 'ana.santos.freela@email.com', role: 'freelancer', displayName: 'Ana Clara Santos', specialty: 'Chef de Cozinha (Fusion)', level: 'Sênior', rating: 4.9, city: 'Sorocaba, SP', bio: "Chef Sênior com 10 anos de experiência...", skills: ["Culinária Fusion", "Liderança de Cozinha", "Criação de Menu"]
    },
    'fl_bruno_costa': { /* ... Perfil do Bruno Costa ... */ 
      uid: 'fl_bruno_costa', email: 'bruno.costa.drinks@email.com', role: 'freelancer', displayName: 'Bruno Costa Lima', specialty: 'Bartender / Mixologista', level: 'Pleno', rating: 4.7, city: 'Campinas, SP', bio: "Mixologista criativo com 5 anos de experiência...", skills: ["Mixologia", "Drinks Autorais", "Atendimento ao Cliente"]
    },
    'fl_carla_melo': { /* ... Perfil da Carla Melo ... */ 
      uid: 'fl_carla_melo', email: 'carla.melo.service@email.com', role: 'freelancer', displayName: 'Carla Souza de Melo', specialty: 'Garçonete / Maître', level: 'Júnior', rating: 4.5, city: 'Sorocaba, SP', bio: "Profissional de atendimento com 2 anos de experiência...", skills: ["Atendimento ao Cliente", "Serviço de Vinhos"]
    }
  },

  mockCompanies: {
    // Perfil da Marina (Gourmet Hall) com seu UID REAL
    'SrOu4NppG7XDuQIXcHNoeKiq3Pn2': {
      uid: 'SrOu4NppG7XDuQIXcHNoeKiq3Pn2',
      email: 'marina.guedes@gourmethall.com',
      role: 'company',
      displayName: 'Gourmet Hall Eventos',
      field: 'Buffet e Organização de Eventos',
      location: 'Sorocaba, SP',
      bio: "Com mais de 10 anos de tradição em Sorocaba, o Gourmet Hall Eventos é referência em alta gastronomia para casamentos, eventos corporativos e sociais. Nossa missão é criar momentos inesquecíveis, e para isso, buscamos os melhores talentos freelancers da região para compor nossa equipe de elite."
    },
    'emp_villa_bistro': {
      uid: 'emp_villa_bistro',
      email: 'ricardo.alves@villabistro.com',
      role: 'company',
      displayName: 'Villa Bistrô & Café',
      field: 'Restaurante Contemporâneo',
      location: 'Sorocaba, SP',
      bio: "Villa Bistrô & Café é um restaurante contemporâneo no coração do Campolim, focado em ingredientes locais e frescos. Buscamos freelancers para eventos especiais, fins de semana e para cobrir nossa equipe fixa."
    }
  },

  mockVagas: [
    // ... (suas vagas fictícias) ...
    { titulo: 'Chef de Cozinha (Sênior) para Casamento', remuneracao: 750, dataEvento: '2025-11-15', companyId: 'SrOu4NppG7XDuQIXcHNoeKiq3Pn2', companyName: 'Gourmet Hall Eventos', location: 'Jd. Faculdade, Sorocaba - SP' },
    { titulo: 'Bartender (Pleno) para Noite de Drinks', remuneracao: 300, dataEvento: '2025-11-08', companyId: 'emp_villa_bistro', companyName: 'Villa Bistrô & Café', location: 'Centro, Sorocaba - SP' },
    { titulo: 'Garçom (Júnior) para Fim de Semana', remuneracao: 180, dataEvento: '2025-11-01', companyId: 'emp_villa_bistro', companyName: 'Villa Bistrô & Café', location: 'Campolim, Sorocaba - SP' },
  ],

  // Avaliações DOS FREELANCERS (eles são avaliados)
  mockReviews: {
    'wRv17KpuDsXQ4JINr1jpaHICgrJ2': [
      { rating: 5, companyName: 'Villa Bistrô & Café', comment: 'Jake foi excepcional! Extremamente profissional.' },
      { rating: 4, companyName: 'Gourmet Hall Eventos', comment: 'Bom cozinheiro, se adaptou bem à equipe.' }
    ],
    'fl_ana_santos': [
      { rating: 5, companyName: 'Gourmet Hall Eventos', comment: 'Contratamos a Ana para um casamento e foi a melhor decisão.' }
    ],
  },

  // --- NOVO BLOCO DE DADOS ---
  // Avaliações DAS EMPRESAS (elas são avaliadas)
  mockCompanyReviews: {
    // Avaliações para Gourmet Hall (Marina Guedes)
    'SrOu4NppG7XDuQIXcHNoeKiq3Pn2': [
      {
        rating: 5,
        freelancerName: 'Jake Trindade',
        comment: 'A Gourmet Hall é excelente para trabalhar. A Sra. Marina é muito organizada, a cozinha é de primeira linha e o pagamento foi feito em dia. Recomendo!',
      },
      {
        rating: 4,
        freelancerName: 'Ana Clara Santos',
        comment: 'Ambiente profissional e equipe muito boa. O evento foi grande e um pouco caótico no início, mas a organização geral foi ótima.',
      }
    ],
    // Avaliações para Villa Bistrô
    'emp_villa_bistro': [
      {
        rating: 5,
        freelancerName: 'Jake Trindade',
        comment: 'O Villa Bistrô tem um ambiente fantástico e uma equipe muito acolhedora. Foi um prazer trabalhar na Noite de Drinks.',
      }
    ]
  },
  // -------------------------

  mockApplications: [
    // ... (suas candidaturas fictícias) ...
    { vagaId: 'vaga_102', vagaTitulo: 'Bartender (Pleno) para Noite de Drinks', companyName: 'Villa Bistrô & Café', dataEvento: '2025-11-08', remuneracao: 300, freelancerId: 'wRv17KpuDsXQ4JINr1jpaHICgrJ2', status: 'em análise' },
    { vagaId: 'vaga_101', vagaTitulo: 'Chef de Cozinha (Sênior) para Casamento', companyName: 'Gourmet Hall Eventos', dataEvento: '2025-11-15', remuneracao: 750, freelancerId: 'wRv17KpuDsXQ4JINr1jpaHICgrJ2', status: 'aprovado' },
  ]
};