
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ handleLogout, toggleTheme, currentTheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">iFree</NavLink>
      </div>
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} end>Vagas</NavLink>
        <NavLink to="/my-jobs" className={({ isActive }) => isActive ? "active" : ""}>Meus Jobs</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>Meu Perfil</NavLink>
      </div>
      <div className="navbar-actions">
        <div className="settings-container">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="settings-button">⚙️</button>
          {isDropdownOpen && (
            <div className="settings-dropdown">
              {/* LINK ATUALIZADO AQUI */}
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