import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { ref, get } from "firebase/database";
import { database } from "../firebase";
import { useTranslation } from "react-i18next";
import "./ProfileScreen.css";

const ProfileScreen = () => {
  const { t } = useTranslation();
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

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("✅ Session closed successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">{t("profile.profile")}</h1>

      {userInfo ? (
        <>
          <div className="profile-avatar">
            {userInfo.nombre ? userInfo.nombre.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="profile-info">
            <p className="label">{t("profile.uid")}:</p>
            <p className="value">{userInfo.uid}</p>

            <p className="label">{t("profile.name")}:</p>
            <p className="value">
              {userInfo.nombre || t("profile.not_available", "Not available")}
            </p>

            <p className="label">{t("profile.email")}:</p>
            <p className="value">
              {userInfo.email || t("profile.not_available", "Not available")}
            </p>

            <p className="label">{t("profile.role")}:</p>
            <p className="value">{userInfo.role || t("profile.user")}</p>
          </div>

          <div className="profile-buttons">
            <button
              className="profile-button settings"
              onClick={() => navigate("/settings")}
            >
              {t("profile.settings")}
            </button>
            <button className="profile-button logout" onClick={handleLogout}>
              {t("profile.logout")}
            </button>
            <button
              className="profile-button back"
              onClick={() => navigate("/home")}
            >
              {t("profile.home")}
            </button>
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center" }}>{t("profile.loading")}</p>
      )}
    </div>
  );
};

export default ProfileScreen;
