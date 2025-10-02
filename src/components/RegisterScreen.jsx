import React, { useState } from "react";
import "./LoginScreen.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log("📡 auth recibido:", auth);

    if (!email || !password || !confirmPassword) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      console.log("📧 Email:", email);
      console.log("🔑 Password:", password);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await set(ref(database, `usuarios/${user.uid}/info`), {
        email: user.email,
        nombre: nombre || "Usuario sin nombre",
        creadoEn: new Date().toISOString(),
      });

      alert("✅ Account created successfully");
      navigate("/");
    } catch (error) {
      console.log("❌ Error : ", error);
      alert("❌ " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Create Account</h1>
      <div className="login-box">
        <h2 className="login-subtitle">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="login-input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
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

        <input
          type="password"
          placeholder="Confirm Password"
          className="login-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleRegister}>
          Sign Up
        </button>

        <div className="login-footer">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/login")}
            className="link"
            style={{ cursor: "pointer" }}
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
