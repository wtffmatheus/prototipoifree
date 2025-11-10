// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import './ProfilePage.css';

const ProfilePage = () => {
  // A CORREÇÃO ESTÁ AQUI: Removido o sinal de igual extra
  const [profileData, setProfileData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndReviews = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData(data);

          const reviewsRef = collection(db, 'users', user.uid, 'reviews');
          const q = query(reviewsRef, orderBy('createdAt', 'desc'));
          const querySnapshot = await getDocs(q);
          const fetchedReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setReviews(fetchedReviews);
          
        } else {
          console.error("Não foi encontrado um perfil para este usuário.");
        }
      }
      setLoading(false);
    };

    fetchProfileAndReviews();
  }, []);

  if (loading) { return <div className="loading-screen">Carregando perfil...</div>; }
  if (!profileData) { return <div className="dashboard-page"><h1 className="page-header">Perfil não encontrado</h1></div>; }

  const { displayName, email, role, specialty, rating, photoURL, bio, skills, field } = profileData;

  const renderStars = (ratingValue) => (
    <div className="profile-rating">
      {'★'.repeat(Math.round(ratingValue))}{'☆'.repeat(5 - Math.round(ratingValue))}
      <span> ({ratingValue})</span>
    </div>
  );

  return (
    <div className="dashboard-page profile-page">
      <h1 className="page-header">Meu Perfil</h1>
      <div className="profile-grid-container">
        <div className="profile-left-column">
          <div className="profile-card-main">
            <img 
              src={photoURL || `https://ui-avatars.com/api/?name=${displayName}&background=FF6B6B&color=fff&size=120`} 
              alt="Foto do perfil" 
              className="profile-avatar-large" 
            />
            <h2>{displayName}</h2>
            <p className="profile-email">{email}</p> 
            <p className="profile-specialty">{specialty || (role === 'company' ? (field || 'Empresa') : 'Freelancer')}</p>
            {role === 'freelancer' && rating && renderStars(rating)}
            <Link to="/profile-edit" className="edit-profile-button">
              Editar Perfil
            </Link>
          </div>
        </div>

        <div className="profile-right-column">
          {bio && (
            <div className="profile-details-card">
              <h3>{role === 'freelancer' ? 'Sobre Mim' : 'Sobre a Empresa'}</h3>
              <p className="profile-bio">{bio}</p>
            </div>
          )}
          {role === 'freelancer' && skills && skills.length > 0 && (
            <div className="profile-details-card">
              <h3>Habilidades</h3>
              <div className="skills-container">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}
          <div className="profile-details-card">
            <h3>{role === 'freelancer' ? 'Avaliações Recebidas' : 'Avaliações de Freelancers'}</h3>
            {reviews.length === 0 ? (
              <p className="no-reviews">Nenhuma avaliação recebida ainda.</p>
            ) : (
              <div className="reviews-list">
                {reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-rating-stars">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                    <p className="review-comment">"{review.comment}"</p>
                    <span className="review-company">
                      — {review.companyName || review.freelancerName}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;