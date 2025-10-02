import React, { useState } from "react";
import "./LoginScreen.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database"; 
import { auth, database } from "../firebase"; 
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Usuario logueado:", user.uid);

      await set(ref(database, "config/uid"), user.uid);
      console.log("UID guardado en Firebase:", user.uid);

      alert("Login success");
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
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
