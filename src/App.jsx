import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProfileScreen from "./components/ProfileScreen";
import SettingsScreen from "./components/SettingsScreen";
import AlertsScreen from "./components/AlertsScreen";
import DataDetailScreen from "./components/DataDetailScreen";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/NavBar";
import "./index.css";

function App() {
  return (
    <Router>
      <div>
       <Navbar />

        {/* Rutas */}
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/alerts" element={<AlertsScreen />} />
          <Route path="/data" element={<DataDetailScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/splash" element={<SplashScreen />} />

          {/* ruta por defecto */}
          <Route path="*" element={<SplashScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
