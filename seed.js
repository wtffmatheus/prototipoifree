// seed.js
const admin = require('firebase-admin');

// Importa os novos dados de reviews de empresas
const { 
  mockFreelancers, 
  mockCompanies, 
  mockVagas, 
  mockReviews, 
  mockApplications, 
  mockCompanyReviews // IMPORTAÇÃO ADICIONADA
} = require('./src/data/mockData.js');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function seedDatabase() {
  console.log("--- INICIANDO SCRIPT DE ADMIN ---");
  const vagaIdMap = {};

  try {
    console.log("Limpando coleções antigas...");
    await deleteCollection('users');
    await deleteCollection('vagas');
    console.log("Coleções antigas limpas.");

    console.log("Inserindo Freelancers...");
    for (const uid in mockFreelancers) {
      await db.collection("users").doc(uid).set(mockFreelancers[uid]);
    }
    console.log("✅ Freelancers inseridos!");

    console.log("Inserindo Empresas...");
    for (const uid in mockCompanies) {
      await db.collection("users").doc(uid).set(mockCompanies[uid]);
    }
    console.log("✅ Empresas inseridas!");

    console.log("Inserindo Vagas...");
    let vagaCounter = 101;
    for (const vaga of mockVagas) {
      const vagaRef = await db.collection("vagas").add({ ...vaga, criadoEm: admin.firestore.FieldValue.serverTimestamp() });
      const mockVagaId = `vaga_${vagaCounter}`;
      vagaIdMap[mockVagaId] = vagaRef.id;
      vagaCounter++;
    }
    console.log("✅ Vagas inseridas!");

    console.log("Inserindo Avaliações de Freelancers (Reviews)...");
    for (const freelancerId in mockReviews) {
      const reviews = mockReviews[freelancerId];
      for (const review of reviews) {
        await db.collection("users").doc(freelancerId).collection("reviews").add({ ...review, createdAt: admin.firestore.FieldValue.serverTimestamp() });
      }
    }
    console.log("✅ Avaliações de Freelancers inseridas!");
    
    // --- LÓGICA ADICIONADA ---
    console.log("Inserindo Avaliações de Empresas (Company Reviews)...");
    for (const companyId in mockCompanyReviews) {
      const reviews = mockCompanyReviews[companyId];
      for (const review of reviews) {
        // Salva na subcoleção 'reviews' do documento da empresa
        await db.collection("users").doc(companyId).collection("reviews").add({
          ...review,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }
    console.log("✅ Avaliações de Empresas inseridas!");
    // -------------------------
    
    console.log("Inserindo Candidaturas Fictícias...");
    for (const app of mockApplications) {
      const realVagaId = vagaIdMap[app.vagaId];
      if (realVagaId) {
        const candidaturaRef = db.collection("vagas").doc(realVagaId).collection("candidaturas").doc(app.freelancerId);
        await candidaturaRef.set({
          freelancerId: app.freelancerId,
          freelancerEmail: mockFreelancers[app.freelancerId].email,
          freelancerName: mockFreelancers[app.freelancerId].displayName,
          appliedAt: admin.firestore.FieldValue.serverTimestamp(),
          status: app.status
        });

        const userAppRef = db.collection("users").doc(app.freelancerId).collection("myApplications").doc(realVagaId);
        await userAppRef.set({
          vagaId: realVagaId,
          status: app.status,
          titulo: app.vagaTitulo,
          companyName: app.companyName,
          dataEvento: app.dataEvento,
          remuneracao: app.remuneracao
        });
      }
    }
    console.log("✅ Candidaturas fictícias inseridas!");
    console.log("--- SCRIPT CONCLUÍDO COM SUCESSO ---");

  } catch (error) {
    console.error("❌ Erro ao popular o banco de dados:", error);
  }
}

// ... (Função deleteCollection continua a mesma) ...
async function deleteCollection(collectionPath) {
  const collectionRef = db.collection(collectionPath);
  const snapshot = await collectionRef.limit(100).get(); 
  if (snapshot.empty) { return; }
  const batch = db.batch();
  snapshot.docs.forEach(doc => { batch.delete(doc.ref); });
  await batch.commit();
  return deleteCollection(collectionPath);
}

seedDatabase();