import React from "react";
import "./LoginScreen.css";
import { useNavigate } from "react-router-dom"; 

const LoginScreen = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
}) => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1 className="login-title">¡Welcome!</h1>
      <div className="login-box">
        <h2 className="login-subtitle">Log In</h2>

        <input
          type="email"
          placeholder="Email/User"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
          Log In
        </button>

        <div className="login-options">
          <a
            onClick={(e) => {
              e.preventDefault();
              alert("Working on it.");
            }}
            className="link"
            style={{ cursor: "pointer" }}
          >
            Trouble logging in?
          </a>

          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Recuérdame</label>
          </div>
        </div>

        <div className="login-footer">
          ¿Don't have an account?{" "}
          <a
            onClick={() => navigate("/register")}
            className="link"
            style={{ cursor: "pointer" }}
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
