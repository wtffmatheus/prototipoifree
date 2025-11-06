// src/components/common/SuccessModal.js
import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ isOpen, onClose, message, title = "Sucesso!" }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="success-modal-content">
        <div className="success-icon-container">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            {/* A CORREÇÃO ESTÁ AQUI: Adicionado um espaço antes de "/>" */}
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="success-modal-button" onClick={onClose}>Ok</button>
      </div>
    </div>
  );
};

export default SuccessModal;