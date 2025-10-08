import React, { useState, useEffect } from "react";
import { auth, database } from "../firebase";
import { ref, push, onValue, remove } from "firebase/database";
import "./SettingsScreen.css";
import ThemeToggle from "../components/ThemeToggle";

const SettingsScreen = ({
  isCelsisus,
  setIsCelsisus,
  tempAlertLimit,
  setTempAlertLimit,
  humidAlertLimit,
  setHumidAlertLimit,
  saveSettings,
}) => {
  const [deviceName, setDeviceName] = useState("");
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const devicesRef = ref(database, `usuarios/${user.uid}/devices`);
    onValue(devicesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));
      setDevices(list);
    });
  }, []);

  const addDevice = async () => {
    if (!deviceName.trim()) {
      alert("⚠️Please enter a device name.");
      return;
    }
    const user = auth.currentUser;
    if (!user) return;

    const devicesRef = ref(database, `usuarios/${user.uid}/devices`);
    await push(devicesRef, { name: deviceName });
    setDeviceName("");
  };

  const deleteDevice = async (id) => {
    const user = auth.currentUser;
    if (!user) return;
    await remove(ref(database, `usuarios/${user.uid}/devices/${id}`));
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      <div className="settings-card">
        <div className="settings-section">
          <label>Temperature Unit:</label>
          <div className="settings-radio-group">
            <label>
              <input
                type="radio"
                checked={isCelsisus}
                onChange={() => setIsCelsisus(true)}
              />
              Celsius (°C)
            </label>
            <label>
              <input
                type="radio"
                checked={!isCelsisus}
                onChange={() => setIsCelsisus(false)}
              />
              Fahrenheit (°F)
            </label>
          </div>
        </div>
        <div className="settings-section">
          <label>Temperature Alert Limit:</label>
          <input
            className="settings-input"
            type="number"
            value={tempAlertLimit}
            onChange={(e) => setTempAlertLimit(parseFloat(e.target.value))}
          />
        </div>
        <div className="settings-section">
          <label>Humidity Alert Limit:</label>
          <input
            className="settings-input"
            type="number"
            value={humidAlertLimit}
            onChange={(e) => setHumidAlertLimit(parseFloat(e.target.value))}
          />
        </div>

        <button className="settings-button save" onClick={saveSettings}>
          Save Settings
        </button>
      </div>
      <div className="settings-card">
        <h2 style={{ marginBottom: "16px" }}>Appearance & Language</h2>
        <ThemeToggle />
        <div className="settings-section" style={{ marginTop: "24px" }}>
          <label>Language:</label>
          <select
            className="settings-input"
            value={localStorage.getItem("language") || "en"}
            onChange={(e) => {
              const lang = e.target.value;
              localStorage.setItem("language", lang);
              // Si usas i18next, aquí iría: i18n.changeLanguage(lang);
              window.location.reload();
            }}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="ko">한국어</option>
          </select>
        </div>
      </div>
      <div className="settings-card">
        <h2 style={{ marginBottom: "16px" }}>Device Management</h2>

        <div className="settings-section">
          <label>Add a new device:</label>
          <input
            className="settings-input"
            type="text"
            placeholder="Enter device name..."
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <button className="settings-button save" onClick={addDevice}>
            Add Device
          </button>
        </div>

        <div className="settings-section">
          <label>Current devices:</label>
          {devices.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {devices.map((device) => (
                <li
                  key={device.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: "1px solid #334155",
                  }}
                >
                  <span>{device.name}</span>
                  <button
                    className="settings-button back"
                    onClick={() => deleteDevice(device.id)}
                    style={{ width: "auto", padding: "6px 12px" }}
                  >
                    🗑️ Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#94a3b8", marginTop: "8px" }}>
              No devices added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
