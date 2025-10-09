import React, { useState } from "react";
import "./LoginScreen.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert(t("login.fill_all_fields", "Please fill all fields"));
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("Usuario logueado:", user.uid);

      await set(ref(database, `usuarios/${user.uid}/config/uid`), user.uid);
      console.log("UID guardado en Firebase:", user.uid);

      alert(t("login.login_success"));
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      alert("❌ " + t("login.login_error") + ": " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">{t("login.welcome")}</h1>

      <div className="login-box">
        <h2 className="login-subtitle">{t("login.login")}</h2>

        <input
          type="email"
          placeholder={t("login.email_placeholder")}
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={t("login.password_placeholder")}
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
          {t("login.login")}
        </button>

        <div className="login-options">
          <a
            onClick={(e) => {
              e.preventDefault();
              alert(t("login.trouble"));
            }}
            className="link"
            style={{ cursor: "pointer" }}
          >
            {t("login.trouble")}
          </a>

          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">{t("login.remember_me")}</label>
          </div>
        </div>

        <div className="login-footer">
          {t("login.no_account")}{" "}
          <a
            onClick={() => navigate("/register")}
            className="link"
            style={{ cursor: "pointer" }}
          >
            {t("login.signup")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
