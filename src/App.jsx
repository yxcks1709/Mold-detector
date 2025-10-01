import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ProfileScreen from "./components/ProfileScreen";
import SettingsScreen from "./components/SettingsScreen";
import AlertsScreen from "./components/AlertsScreen";
import DataDetailScreen from "./components/DataDetailScreen";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/NavBar";
import "./index.css";
import RegisterScreen from "./components/RegisterScreen";

function App() {
  const [isCelsisus, setIsCelsisus] = useState(true);
  const [tempAlertLimit, setTempAlertLimit] = useState(28);
  const [humidAlertLimit, setHumidAlertLimit] = useState(70);

  const saveSettings = () => {
    console.log("✅  Settings saved:", {
      isCelsisus,
      tempAlertLimit,
      humidAlertLimit,
    });
    alert("Settings saved successfully ✅");
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/home"
            element={
              <HomeScreen
                isCelsisus={isCelsisus}
                tempAlertLimit={tempAlertLimit}
                humidAlertLimit={humidAlertLimit}
              />
            }
          />

          <Route path="/profile" element={<ProfileScreen />} />

          <Route
            path="/settings"
            element={
              <SettingsScreen
                isCelsisus={isCelsisus}
                setIsCelsisus={setIsCelsisus}
                tempAlertLimit={tempAlertLimit}
                setTempAlertLimit={setTempAlertLimit}
                humidAlertLimit={humidAlertLimit}
                setHumidAlertLimit={setHumidAlertLimit}
                saveSettings={saveSettings}
              />
            }
          />

          <Route path="/alerts" element={<AlertsScreen />} />
          <Route path="/data" element={<DataDetailScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
