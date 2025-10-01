import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { ref, get } from "firebase/database";
import "./ProfileScreen.css";

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const uid = currentUser.uid;

        try {
          const snapshot = await get(ref(database, `usuarios/${uid}/info`));
          if (snapshot.exists()) {
            setUserInfo(snapshot.val());
          } else {
            console.log("❌ No se encontraron datos del usuario");
          }
        } catch (error) {
          console.error("❌ Error al obtener datos:", error);
        }
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>

      <div className="profile-avatar">
        {userInfo?.nombre ? userInfo.nombre.charAt(0).toUpperCase() : "U"}
      </div>

      <div className="profile-info">
        <p className="label">Name:</p>
        <p className="value">{userInfo?.nombre || "No disponible"}</p>

        <p className="label">E-Mail:</p>
        <p className="value">{userInfo?.email || "No disponible"}</p>

        <p className="label">Rol:</p>
        <p className="value">Usuario</p>
      </div>

      <div className="profile-buttons">
        <button
          className="profile-button settings"
          onClick={() => navigate("/settings")}
        >
          Settings
        </button>

        <button className="profile-button logout" onClick={handleLogout}>
          Log Out
        </button>

        <button className="profile-button back" onClick={() => navigate("/home")}>
          Home
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
