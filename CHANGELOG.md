# Changelog - Projeto iFree

Este arquivo registra todas as principais alterações e funcionalidades implementadas no projeto iFree.

---

## 🚀 Guias Rápidos de Desenvolvimento

Esta seção contém instruções essenciais para gerenciar e testar o aplicativo.

### Como Popular o Banco de Dados (Seed)

Para preencher seu banco de dados do Firestore com os dados fictícios (perfis, vagas, reviews, etc.) do arquivo `src/data/mockData.js`.

**Pré-requisito:** Você precisa ter o arquivo `serviceAccountKey.json` (sua "chave mestra" do Firebase Admin) na pasta raiz do projeto.

1.  Abra o terminal na pasta raiz do projeto (`ifree-app`).
2.  Execute o seguinte comando:
    ```bash
    node seed.js
    ```
3.  O script irá limpar as coleções antigas e inserir todos os dados fictícios. Isso ignora todas as regras de segurança e não requer que você "abra as portas" do banco.

### Como Salvar e Atualizar o App no GitHub (Workflow)

Para salvar seu progresso (criar um "snapshot") e enviar suas atualizações para o repositório online no GitHub.

1.  **Adicionar Alterações:** No terminal, adicione todos os arquivos que você modificou:
    ```bash
    git add .
    ```
2.  **Criar o "Snapshot" (Commit):** Salve as alterações com uma mensagem descritiva (incluindo a data):
    ```bash
    git commit -m "Sua mensagem aqui (ex: Concluído dashboard da empresa) - 10/11/2025"
    ```
3.  **Enviar para o GitHub:** Envie seu "snapshot" local para a nuvem:
    ```bash
    git push
    ```

---

## 2025-11-11 (Hoje)

### 👤 Página "Meu Perfil" — Finalização Completa

* **Edição de Perfil (Funcional):**
    * Implementada a lógica de atualização de dados do usuário no Firestore diretamente via formulário.
    * Campos editáveis: nome, bio, habilidades e imagem de perfil.
    * Criado feedback visual de sucesso após atualização (usando `SuccessModal`).
    * Tratamento de erros e verificação de campos obrigatórios antes do envio.

* **Integração entre Visualização e Edição:**
    * Adicionada transição fluida entre o modo de visualização e o modo de edição.
    * Dados atualizados agora são refletidos instantaneamente na interface sem precisar recarregar a página.

* **Ajustes de Estilo e Layout:**
    * Refinado o design da aba de perfil para seguir o padrão visual do app.
    * Melhorada a responsividade da seção de informações pessoais e habilidades.
    * Ícones e espaçamentos atualizados para manter consistência entre as páginas Freelancer e Empresa.

### 🧩 Outras Melhorias e Manutenções Gerais

* **Navbar e Navegação:**
    * Corrigido bug que impedia a atualização do estado de login após edição de perfil.
    * Ajustado comportamento do menu de configurações no modo empresa.

* **Otimizações no Firestore:**
    * Revisada a estrutura de subcoleções `users/{userId}/candidaturas` para melhorar a filtragem e evitar duplicações.
    * Atualizadas as permissões no `firestore.rules` para garantir que apenas o dono do perfil possa atualizar seus próprios dados.

* **Organização de Código:**
    * Separadas funções de manipulação de dados em um arquivo auxiliar `utils/firestoreHelpers.js`.
    * Melhorado o nome das variáveis e funções nos componentes de perfil para legibilidade e manutenção futura.

### 🗂️ Gerenciamento de Projeto

* Atualizado o `CHANGELOG.md` com os registros das últimas implementações.
* Feitos commits diários seguindo a convenção:
    ```bash
    git commit -m "Finalizada aba Meu Perfil + edição funcional - 11/11/2025"
    ```
* Mantido backup automático via `git push` para garantir histórico completo das entregas.

---

## 2025-11-10

### 🚀 Início do Dashboard da Empresa (Restaurante)

O foco de hoje foi construir a "central de comando" para o lado da empresa, garantindo que ela tenha uma experiência visualmente distinta e as ferramentas necessárias para gerenciar suas vagas.

* **Design Exclusivo da Empresa:**
    * Criado o `CompanyDashboard.css` com uma nova paleta de cores (azul profissional, `--company-primary-color`) para diferenciar visualmente a área da empresa da área do freelancer (vermelha).

* **Lógica do Dashboard da Empresa:**
    * Modificado o `CompanyDashboard.js` para ser uma página funcional.
    * O dashboard agora busca no Firestore **apenas** as vagas que pertencem ao `companyId` do usuário logado.
    * Implementada a lógica para contar quantos documentos (candidaturas) existem na subcoleção `vagas/{vagaId}/candidaturas` de cada vaga.

* **Interface da Empresa:**
    * O dashboard da empresa agora exibe suas vagas em cards, mostrando o título, a data e um contador de "Candidaturas".
    * Adicionado um botão placeholder "+ Postar Nova Vaga".

* **Segurança (Regras do Firestore):**
    * Atualizado o `firestore.rules` para permitir que o dono da vaga (`companyId`) tenha permissão de `read` (leitura) na subcoleção de `candidaturas` daquela vaga.

### 🗂️ Gerenciamento de Projeto

* **Backup e Histórico:**
    * Discutimos e implementamos a forma correta de salvar o progresso do projeto usando `git commit` para criar um "snapshot" do código.
    * Criado este arquivo `CHANGELOG.md` para documentar o progresso.

---

## 2025-11-09

### 🏗️ Estrutura Principal e UI/UX Global

* **Setup e Roteamento:**
    * Configurado o projeto React e feita a integração inicial com o Firebase (`firebase/config.js`).
    * Instalado e configurado o `react-router-dom` no `App.js` para criar a navegação entre as páginas.

* **Layout e Interface:**
    * Criado o componente `Navbar.js` (a "hotbar") com navegação principal.
    * Implementado um menu de configurações (⚙️) na Navbar com um dropdown.
    * Implementado o **Modo Escuro (Dark Mode)** completo, com um botão de troca no menu de configurações. O tema é salvo no `localStorage` para persistir.

* **Componentes Reutilizáveis:**
    * Criado um componente `Modal.js` para pop-ups de confirmação.
    * Criado um componente `SuccessModal.js` com a animação "V verde" (estilo Mercado Livre) para feedback de sucesso.

### 🔐 Fluxo de Autenticação

* **Login e Cadastro:**
    * Criada a página `AuthPage.js` unificada.
    * Implementado o cadastro de usuários com E-mail/Senha, incluindo a distinção de `role` (freelancer ou company).
    * Implementado o login com E-mail/Senha e o **Login com Google**.

### 👤 Fluxo Completo do Freelancer

* **Visualização de Vagas (`FreelancerDashboard.js`):**
    * A página principal do freelancer busca e exibe em tempo real todas as vagas disponíveis no Firestore, em um layout de cards.

* **Candidatura a Vagas (Fluxo Completo):**
    1.  O freelancer clica em "Candidatar-se".
    2.  O sistema verifica se o perfil do usuário está completo.
    3.  Se incompleto, exibe o modal "Complete seu Perfil".
    4.  Se completo, exibe o modal de confirmação "Você tem certeza?".
    5.  Ao confirmar, a candidatura é salva no Firestore com o status "em análise".
    6.  Exibe o modal de sucesso animado ("V verde").

* **Página "Meus Jobs" (`MyJobsPage.js`):**
    * Criada uma página que busca apenas as candidaturas do próprio usuário.
    * Implementadas abas para filtrar os jobs por status: "Em Análise", "Aprovados", "Concluídos".

* **Página "Meu Perfil" (`ProfilePage.js`):**
    * Criada uma página de perfil com layout profissional de duas colunas (visualização e edição).
    * **Visualização:** Mostra "Sobre" (bio), "Habilidades" (tags) e "Avaliações Recebidas".
    * **Edição (`EditProfilePage.js`):** Um formulário que permite ao usuário atualizar seus dados no Firestore.

### ⚙️ Backend e DevOps (Admin)

* **Dados Fictícios (`mockData.js`):**
    * Criado um arquivo centralizado (`module.exports`) com todos os dados fictícios necessários para testar o app (perfis, vagas, reviews, candidaturas).

* **Script de "Chave Mestra" (`seed.js`):**
    * Criado um script de administrador (`node seed.js`) que usa a "Conta de Serviço" (Admin SDK) do Firebase.
    * Este script ignora as regras de segurança e popula todo o banco de dados com os dados fictícios, incluindo a criação de subcoleções.

* **Limpeza do Código:**
    * Removido o botão inseguro "Popular DB" da interface do `App.js`.
