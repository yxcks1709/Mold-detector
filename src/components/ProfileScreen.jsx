import React from 'react';
import './ProfileScreen.css';

const ProfileScreen = ({ user, handleLogout, setCurrentPage }) => (
  <div className="profile-container">
    <h1 className="profile-title">Perfil de Usuario</h1>

    {/* Avatar */}
    <div className="profile-avatar">
      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
    </div>

    {/* Información del usuario */}
    <div className="profile-info">
      <p className="label">Nombre:</p>
      <p className="value">{user?.name || "No disponible"}</p>

      <p className="label">Correo:</p>
      <p className="value">{user?.email || "No disponible"}</p>

      <p className="label">Rol:</p>
      <p className="value">{user?.role || "Usuario"}</p>
    </div>

    {/* Botones */}
    <div className="profile-buttons">
      <button className="profile-button settings" onClick={() => setCurrentPage('settings')}>
        Ajustes
      </button>

      <button className="profile-button logout" onClick={handleLogout}>
        Cerrar sesión
      </button>

      <button className="profile-button back" onClick={() => setCurrentPage('home')}>
        Volver al inicio
      </button>
    </div>
  </div>
);

export default ProfileScreen;
