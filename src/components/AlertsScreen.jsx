import React from 'react';
import './AlertsScreen.css';

const AlertsScreen = ({ alerts, setCurrentPage }) => (
  <div className="alerts-container">
    <h1 className="alerts-title">Alertas</h1>
    <div className="alerts-box">
      {alerts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#94a3b8' }}>No hay alertas recientes.</p>
      ) : (
        <ul className="alerts-list">
          {alerts.map((alert, index) => (
            <li key={index} className="alert-item">
              <p className="alert-type">{alert.type}</p>
              <p className="alert-message">{alert.message}</p>
              <p className="alert-timestamp">
                {alert.timestamp?.toDate()?.toLocaleString() ?? 'Fecha no disponible'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
    <button className="back-button" onClick={() => setCurrentPage('home')}>
      Volver
    </button>
  </div>
);

export default AlertsScreen;
