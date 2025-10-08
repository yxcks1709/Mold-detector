import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./firebase";
import ProfileScreen from "./components/ProfileScreen";
import SettingsScreen from "./components/SettingsScreen";
import AlertsScreen from "./components/AlertsScreen";
import DataDetailScreen from "./components/DataDetailScreen";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import Navbar from "./components/NavBar";
import RegisterScreen from "./components/RegisterScreen";
import "./index.css";
import { ref, set } from "firebase/database";

const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);


function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  if (user === null) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const [isCelsisus, setIsCelsisus] = useState(true);
  const [tempAlertLimit, setTempAlertLimit] = useState(28);
  const [humidAlertLimit, setHumidAlertLimit] = useState(70);

  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];

  const saveSettings = async () => {
    const user = auth.currentUser;
    if (!user) return alert("⚠️ No user logged in");

    await set(ref(database, `usuarios/${user.uid}/settings`), {
      isCelsisus,
      tempAlertLimit,
      humidAlertLimit,
    });

    alert("✅ Settings saved successfully");
  };

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen
                isCelsisus={isCelsisus}
                tempAlertLimit={tempAlertLimit}
                humidAlertLimit={humidAlertLimit}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsScreen
                isCelsisus={isCelsisus}
                setIsCelsisus={setIsCelsisus}
                tempAlertLimit={tempAlertLimit}
                setTempAlertLimit={setTempAlertLimit}
                humidAlertLimit={humidAlertLimit}
                setHumidAlertLimit={setHumidAlertLimit}
                saveSettings={saveSettings}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <AlertsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <DataDetailScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
