import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileScreen.css';

const ProfileScreen = ({ user}) => {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>

      <div className="profile-avatar">
        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
      </div>

      <div className="profile-info">
        <p className="label">Name:</p>
        <p className="value">{user?.name || "No disponible"}</p>

        <p className="label">E-Mail:</p>
        <p className="value">{user?.email || "No disponible"}</p>

        <p className="label">Rol:</p>
        <p className="value">{user?.role || "Usuario"}</p>
      </div>

      <div className="profile-buttons">
        <button className="profile-button settings" onClick={() => navigate('/settings')}>
          Settings
        </button>

        <button className="profile-button logout" onClick={() => navigate('/login')}>
          Log Out
        </button>

        <button className="profile-button back" onClick={() => navigate('/home')}>
          Home
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;