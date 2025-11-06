// src/components/layout/Navbar.js
import React, { useState } from 'react';
// Importa o Link para podermos navegar para a página de perfil
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ handleLogout, toggleTheme, currentTheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Função para fechar o dropdown ao clicar em um link
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">iFree</NavLink>
      </div>
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} end>Vagas</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>Meu Perfil</NavLink>
      </div>
      <div className="navbar-actions">
        <div className="settings-container">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="settings-button">
            ⚙️
          </button>
          {isDropdownOpen && (
            <div className="settings-dropdown">
              {/* Adiciona o link para "Editar Perfil" */}
              <Link to="/profile" onClick={closeDropdown}>
                ✏️ Editar Perfil
              </Link>
              <button onClick={() => { toggleTheme(); closeDropdown(); }}>
                {currentTheme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
              </button>
            </div>
          )}
        </div>
        <div className="navbar-logout">
          <button onClick={handleLogout}>Sair</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;