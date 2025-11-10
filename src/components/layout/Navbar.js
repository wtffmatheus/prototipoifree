// src/components/layout/Navbar.js
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

// Aceita a nova prop 'user'
const Navbar = ({ user, handleLogout, toggleTheme, currentTheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeDropdown = () => setIsDropdownOpen(false);

  // ---------- MENSAGEM DE DEPURAÇÃO TEMPORÁRIA ----------
  // Vamos mostrar qual "role" a Navbar acha que o usuário tem.
  const debugStyle = {
    position: 'absolute',
    top: '80px',
    left: '20px',
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
    zIndex: 2000,
    fontSize: '1.2rem',
    fontWeight: 'bold'
  };
  // -----------------------------------------------------

  return (
    <nav className="navbar">
      
      {/* --- MENSAGEM DE DEPURAÇÃO VAI APARECER AQUI --- */}
      <div style={debugStyle}>
        DEBUG: A Navbar vê a role como: "{user.role}"
      </div>
      {/* ----------------------------------------------- */}

      <div className="navbar-brand">
        <NavLink to="/">iFree</NavLink>
      </div>

      <div className="navbar-links">
        {user.role === 'freelancer' ? (
          <>
            {/* Links do Freelancer */}
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} end>Vagas</NavLink>
            <NavLink to="/my-jobs" className={({ isActive }) => isActive ? "active" : ""}>Meus Jobs</NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>Meu Perfil</NavLink>
          </>
        ) : (
          <>
            {/* Links da Empresa */}
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} end>Minhas Vagas</NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>Perfil da Empresa</NavLink>
          </>
        )}
      </div>

      <div className="navbar-actions">
        {/* ... (o resto do código do menu de configurações continua o mesmo) ... */}
        <div className="settings-container">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="settings-button">⚙️</button>
          {isDropdownOpen && (
            <div className="settings-dropdown">
              <Link to="/profile-edit" onClick={closeDropdown}>
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
