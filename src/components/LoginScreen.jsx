import React from 'react';
import './LoginScreen.css';

const LoginScreen = ({ email, setEmail, password, setPassword, handleLogin, handleRegister }) => (
  <div className="login-container">
    <h1 className="login-title">¡Bienvenido!</h1>
    <div className="login-box">
      <h2 className="login-subtitle">Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Email o usuario"
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Ingresar</button>

      <div className="login-options">
        <button onClick={() => alert('Función no implementada.')}>¿Olvidaste tu contraseña?</button>
        <div>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Recuérdame</label>
        </div>
      </div>

      <div className="login-footer">
        ¿No tienes cuenta?{' '}
        <button onClick={handleRegister}>Regístrate</button>
      </div>
    </div>
  </div>
);

export default LoginScreen;
