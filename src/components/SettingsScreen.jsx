import React, { useState, useEffect } from "react";
import { auth, database } from "../firebase";
import { ref, onValue, remove, set } from "firebase/database";
import "./SettingsScreen.css";
import ThemeToggle from "../components/ThemeToggle";
import { useTranslation } from "react-i18next";

const SettingsScreen = ({
  isCelsisus,
  setIsCelsisus,
  tempAlertLimit,
  setTempAlertLimit,
  humidAlertLimit,
  setHumidAlertLimit,
  saveSettings,
}) => {
  const { t, i18n } = useTranslation();
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
        name: id,
        info: value.info || {},
      }));
      setDevices(list);
    });
  }, []);

  const addDevice = async () => {
    if (!deviceName.trim()) {
      alert("⚠️ " + t("settings.enter_device_name"));
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    const deviceRef = ref(
      database,
      `usuarios/${user.uid}/devices/${deviceName}/info`
    );
    await set(deviceRef, {
      deviceID: null,
      registeredAt: new Date().toISOString(),
      status: "waiting",
    });

    alert(`✅ ${deviceName} ${t("settings.device_registered")}`);
    setDeviceName("");
  };

  const deleteDevice = async (name) => {
    const user = auth.currentUser;
    if (!user) return;

    await remove(ref(database, `usuarios/${user.uid}/devices/${name}`));
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">{t("settings.settings")}</h1>

      <div className="settings-card">
        <div className="settings-section">
          <label>{t("settings.temperature_unit")}:</label>
          <div className="settings-radio-group">
            <label>
              <input
                type="radio"
                checked={isCelsisus}
                onChange={() => setIsCelsisus(true)}
              />
              {t("settings.celsius")}
            </label>
            <label>
              <input
                type="radio"
                checked={!isCelsisus}
                onChange={() => setIsCelsisus(false)}
              />
              {t("settings.fahrenheit")}
            </label>
          </div>
        </div>

        <div className="settings-section">
          <label>{t("settings.temp_alert_limit")}:</label>
          <input
            className="settings-input"
            type="number"
            value={tempAlertLimit}
            onChange={(e) => setTempAlertLimit(parseFloat(e.target.value))}
          />
        </div>

        <div className="settings-section">
          <label>{t("settings.humid_alert_limit")}:</label>
          <input
            className="settings-input"
            type="number"
            value={humidAlertLimit}
            onChange={(e) => setHumidAlertLimit(parseFloat(e.target.value))}
          />
        </div>

        <button className="settings-button save" onClick={saveSettings}>
          {t("settings.save_settings")}
        </button>
      </div>

      <div className="settings-card">
        <h2 style={{ marginBottom: "16px" }}>
          {t("settings.appearance_language")}
        </h2>
        <ThemeToggle />
        <div className="settings-section" style={{ marginTop: "24px" }}>
          <label>{t("settings.language")}:</label>
          <select
            className="settings-input"
            value={localStorage.getItem("language") || i18n.language || "en"}
            onChange={(e) => {
              const lang = e.target.value;
              localStorage.setItem("language", lang);
              i18n.changeLanguage(lang);
            }}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="ko">한국어</option>
            <option value="lao">ພາສາລາວ</option>
          </select>
        </div>
      </div>

      <div className="settings-card">
        <h2 style={{ marginBottom: "16px" }}>
          {t("settings.device_management")}
        </h2>

        <div className="settings-section">
          <label>{t("settings.add_device")}:</label>
          <input
            className="settings-input"
            type="text"
            placeholder={t("settings.enter_device_name")}
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <button className="settings-button save" onClick={addDevice}>
            {t("settings.add_device")}
          </button>
        </div>

        <div className="settings-section">
          <label>{t("settings.current_devices")}:</label>
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
                    🗑️ {t("settings.delete")}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#94a3b8", marginTop: "8px" }}>
              {t("settings.no_devices_added")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
