import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, get } from "firebase/database";
import { database } from "../firebase";
import "./ProfileScreen.css";

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      get(ref(database, `usuarios/${uid}/info`)).then((snapshot) => {
        if (snapshot.exists()) {
          setUserInfo({ uid, ...snapshot.val() });
        } else {
          setUserInfo({ uid, email: user.email });
        }
      });
    }
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>

      {userInfo ? (
        <>
          <div className="profile-avatar">
            {userInfo.nombre ? userInfo.nombre.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="profile-info">
            <p className="label">UID:</p>
            <p className="value">{userInfo.uid}</p>

            <p className="label">Nombre:</p>
            <p className="value">{userInfo.nombre || "No disponible"}</p>

            <p className="label">E-Mail:</p>
            <p className="value">{userInfo.email || "No disponible"}</p>

            <p className="label">Rol:</p>
            <p className="value">{userInfo.role || "Usuario"}</p>
          </div>

          <div className="profile-buttons">
            <button
              className="profile-button settings"
              onClick={() => navigate("/settings")}
            >
            Settings
            </button>

            <button
              className="profile-button logout"
              onClick={() => navigate("/login")}
            >
            Log Out
            </button>

            <button
              className="profile-button back"
              onClick={() => navigate("/home")}
            >
            Home
            </button>
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center" }}>Loading Profile...</p>
      )}
    </div>
  );
};

export default ProfileScreen;
