import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/home" className="nav-logo">
          🌡️ MoldDetector
        </Link>

        {/* Botón hamburguesa en móvil */}
        <button className="menu-toggle" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {/* Links */}
        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li>
            <Link to="/profile" onClick={() => setOpen(false)}>👤 Perfil</Link>
          </li>
          <li>
            <Link to="/settings" onClick={() => setOpen(false)}>⚙️ Ajustes</Link>
          </li>
          <li>
            <Link to="/alerts" onClick={() => setOpen(false)}>🚨 Alertas</Link>
          </li>
          <li>
            <Link to="/data" onClick={() => setOpen(false)}>📊 Datos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
