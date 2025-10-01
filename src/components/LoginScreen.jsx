import React, { useState } from "react";
import "./LoginScreen.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please, Fill All");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Usuario logueado:", userCredential.user);

      alert("✅ Inicio de sesión exitoso");
      navigate("/home");
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error);
      alert("❌ " + error.message);
    }
  };

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
            <label htmlFor="remember">Remember me</label>
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
