import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // 👈 usa el mismo auth inicializado
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";

const AuthApp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Usuario logueado:", userCredential.user.uid);
      setIsLoggedIn(true); // 👈 puedes cambiar el estado o navegar
    } catch (error) {
      alert("❌ Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <HomeScreen />
      )}
    </>
  );
};

export default AuthApp;
