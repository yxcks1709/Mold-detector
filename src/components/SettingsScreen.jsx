import React from 'react';
import './SettingsScreen.css';

const SettingsScreen = ({
  isCelsisus,
  setIsCelsisus,
  tempAlertLimit,
  setTempAlertLimit,
  humidAlertLimit,
  setHumidAlertLimit,
  saveSettings,
  setCurrentPage
}) => (
  <div className="settings-container">
    <h1 className="settings-title">Ajustes</h1>
    <div className="settings-card">
      <div className="settings-section">
        <h2>Unidades</h2>
        <div className="settings-radio-group">
          <label>
            <input type="radio" name="tempUnit" checked={isCelsisus} onChange={() => setIsCelsisus(true)} />
            °C
          </label>
          <label>
            <input type="radio" name="tempUnit" checked={!isCelsisus} onChange={() => setIsCelsisus(false)} />
            °F
          </label>
        </div>
      </div>

      <div className="settings-section">
        <label>Temperatura (°{isCelsisus ? 'C' : 'F'})</label>
        <input type="number" className="settings-input" value={tempAlertLimit} onChange={(e) => setTempAlertLimit(e.target.value)} />
      </div>

      <div className="settings-section">
        <label>Humedad (%)</label>
        <input type="number" className="settings-input" value={humidAlertLimit} onChange={(e) => setHumidAlertLimit(e.target.value)} />
      </div>

      <button className="settings-button save" onClick={saveSettings}>
        Guardar Ajustes
      </button>
    </div>

    <button className="settings-button back" onClick={() => setCurrentPage('home')}>
      Volver
    </button>
  </div>
);

export default SettingsScreen;
