import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import "./Navbar.css";

const Navbar = () => {
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
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={() => setOpen(false)}>
              Settings
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/profile" onClick={() => setOpen(false)}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/history" onClick={() => setOpen(false)}>
                  Data History
                </Link>
              </li>
              <li>
                <Link to="/alerts" onClick={() => setOpen(false)}>
                  Alerts
                </Link>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setOpen(false)}>
                  Register
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
