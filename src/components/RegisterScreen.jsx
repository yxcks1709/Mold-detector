import React, { useState } from "react";
import "./LoginScreen.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { useTranslation } from "react-i18next";

const RegisterScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      alert(t("register.fill_all_fields", "Please fill all fields."));
      return;
    }

    if (password !== confirmPassword) {
      alert(t("register.password_mismatch"));
      return;
    }

    if (password.length < 6) {
      alert(t("register.password_length"));
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await set(ref(database, `usuarios/${user.uid}/info`), {
        email: user.email,
        nombre: nombre || "Unnamed user",
        creadoEn: new Date().toISOString(),
      });

      await set(ref(database, `usuarios/${user.uid}/config/uid`), user.uid);

      alert(t("register.account_created"));
      navigate("/");
    } catch (error) {
      console.log("❌ Error : ", error);
      alert("❌ " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">{t("register.create_account")}</h1>
      <div className="login-box">
        <h2 className="login-subtitle">{t("register.sign_up")}</h2>

        <input
          type="text"
          placeholder={t("register.name_placeholder")}
          className="login-input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="email"
          placeholder={t("register.email_placeholder")}
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder={t("register.password_placeholder")}
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder={t("register.confirm_password")}
          className="login-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleRegister}>
          {t("register.sign_up")}
        </button>

        <div className="login-footer">
          {t("register.already_account")}{" "}
          <a
            onClick={() => navigate("/login")}
            className="link"
            style={{ cursor: "pointer" }}
          >
            {t("register.login")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
