import React from 'react';
import { useNavigate } from "react-router-dom";
import './SettingsScreen.css';

const SettingsScreen = ({
  isCelsisus,
  setIsCelsisus,
  tempAlertLimit,
  setTempAlertLimit,
  humidAlertLimit,
  setHumidAlertLimit,
  saveSettings,
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      <div className="settings-card">
        <div className="settings-section">
          <h2>Units</h2>
          <div className="settings-radio-group">
            <label>
              <input
                type="radio"
                name="tempUnit"
                checked={isCelsisus}
                onChange={() => setIsCelsisus(true)}
              />
              °C
            </label>
            <label>
              <input
                type="radio"
                name="tempUnit"
                checked={!isCelsisus}
                onChange={() => setIsCelsisus(false)}
              />
              °F
            </label>
          </div>
        </div>

        <div className="settings-section">
          <label>Temperature Alert Limit (°{isCelsisus ? 'C' : 'F'})</label>
          <input
            type="number"
            className="settings-input"
            value={tempAlertLimit}
            onChange={(e) => setTempAlertLimit(e.target.value)}
          />
        </div>

        <div className="settings-section">
          <label>Humidity Alert Limit (%)</label>
          <input
            type="number"
            className="settings-input"
            value={humidAlertLimit}
            onChange={(e) => setHumidAlertLimit(e.target.value)}
          />
        </div>

        <button className="settings-button save" onClick={saveSettings}>
          Save Settings
        </button>
      </div>

      <button className="settings-button back" onClick={() => navigate("/home")}>
        Home
      </button>
    </div>
  );
};

export default SettingsScreen;
