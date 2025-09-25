import React from 'react';
import './DataDetailScreen.css';

const DataDetailScreen = ({ historicalData, setCurrentPage }) => {
  const svgHeight = 200;
  const svgWidth = 350;
  const tempColor = "#67e8f9";
  const humidColor = "#a78bfa";
  const minTemp = 15;
  const maxTemp = 35;
  const minHumid = 40;
  const maxHumid = 90;

  const getYPosition = (value, min, max) => {
    const ratio = (value - min) / (max - min);
    return svgHeight - (ratio * svgHeight);
  };

  const tempPoints = historicalData.map((d, i) => `${(i / (historicalData.length - 1)) * svgWidth},${getYPosition(d.temperature, minTemp, maxTemp)}`).join(' ');
  const humidPoints = historicalData.map((d, i) => `${(i / (historicalData.length - 1)) * svgWidth},${getYPosition(d.humidity, minHumid, maxHumid)}`).join(' ');

  return (
    <div className="data-container">
      <h1 className="data-title">Historial de Datos</h1>
      <div className="data-box">
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>Temperatura y Humedad</h2>
        <div className="chart-wrapper">
          <div style={{ width: `${Math.max(svgWidth, 400)}px` }}>
            <svg className="chart-svg" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
              <line x1="0" y1={svgHeight} x2={svgWidth} y2={svgHeight} stroke="#475569" strokeWidth="2" />
              <line x1="0" y1="0" x2="0" y2={svgHeight} stroke="#475569" strokeWidth="2" />
              {historicalData.length > 1 && (
                <>
                  <polyline points={tempPoints} fill="none" stroke={tempColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points={humidPoints} fill="none" stroke={humidColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
            </svg>
          </div>
        </div>
        <div className="legend">
          <span><span className="legend-dot temp-dot"></span>Temperatura</span>
          <span><span className="legend-dot humid-dot"></span>Humedad</span>
        </div>
        <div className="filter-section">
          <label className="filter-label">Filtrar por fecha:</label>
          <input type="date" className="filter-input" />
          <button className="filter-button">Aplicar Filtro</button>
        </div>
      </div>
      <button className="back-button" onClick={() => setCurrentPage('home')}>Volver</button>
    </div>
  );
};

export default DataDetailScreen;
