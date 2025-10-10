import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useTranslation } from "react-i18next";
import "./NavBar.css";

const Navbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/home" className="nav-logo" onClick={() => setOpen(false)}>
          MoldDetector
        </Link>

        <button className="menu-toggle" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {/* Siempre disponibles */}
          <li>
            <Link to="/home" onClick={() => setOpen(false)}>
              {t("navbar.dashboard")}
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={() => setOpen(false)}>
              {t("navbar.settings")}
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link to="/profile" onClick={() => setOpen(false)}>
                  {t("navbar.profile")}
                </Link>
              </li>
              <li>
                <Link to="/history" onClick={() => setOpen(false)}>
                  {t("navbar.data_history")}
                </Link>
              </li>
              <li>
                <Link to="/alerts" onClick={() => setOpen(false)}>
                  {t("navbar.alerts")}
                </Link>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <Link to="/login" onClick={() => setOpen(false)}>
                  {t("navbar.login")}
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setOpen(false)}>
                  {t("navbar.register")}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
