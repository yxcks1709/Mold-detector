import React, { useState, useMemo } from "react";
import "./DataDetailScreen.css";

const DataDetailScreen = ({ historicalData, setCurrentPage }) => {
  const svgHeight = 200;
  const svgWidth = 350;
  const tempColor = "#67e8f9";
  const humidColor = "#a78bfa";
  const minTemp = 15;
  const maxTemp = 35;
  const minHumid = 40;
  const maxHumid = 90;

  const [selectedDate, setSelectedDate] = useState("");

  // 📅 Filtrar por fecha si se selecciona
  const filteredData = useMemo(() => {
    if (!historicalData) return [];
    if (!selectedDate) return historicalData;

    return historicalData.filter((d) => {
      const date = new Date(d.timestamp).toISOString().split("T")[0];
      return date === selectedDate;
    });
  }, [historicalData, selectedDate]);

  const getYPosition = (value, min, max) => {
    const ratio = (value - min) / (max - min);
    return svgHeight - ratio * svgHeight;
  };

  const tempPoints = filteredData
    .map(
      (d, i) =>
        `${(i / (filteredData.length - 1)) * svgWidth},${getYPosition(
          d.temperature,
          minTemp,
          maxTemp
        )}`
    )
    .join(" ");

  const humidPoints = filteredData
    .map(
      (d, i) =>
        `${(i / (filteredData.length - 1)) * svgWidth},${getYPosition(
          d.humidity,
          minHumid,
          maxHumid
        )}`
    )
    .join(" ");

  return (
    <div className="data-container">
      <h1 className="data-title">📊 Historial Completo de Datos</h1>

      <div className="data-box">
        <h2 className="chart-title">Temperatura y Humedad</h2>
        <div className="chart-wrapper">
          <div style={{ width: `${Math.max(svgWidth, 400)}px` }}>
            <svg
              className="chart-svg"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="xMidYMid meet"
            >
              <line
                x1="0"
                y1={svgHeight}
                x2={svgWidth}
                y2={svgHeight}
                stroke="#475569"
                strokeWidth="2"
              />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2={svgHeight}
                stroke="#475569"
                strokeWidth="2"
              />
              {filteredData.length > 1 && (
                <>
                  <polyline
                    points={tempPoints}
                    fill="none"
                    stroke={tempColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points={humidPoints}
                    fill="none"
                    stroke={humidColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}
            </svg>
          </div>
        </div>

        <div className="legend">
          <span>
            <span className="legend-dot temp-dot"></span>Temperatura
          </span>
          <span>
            <span className="legend-dot humid-dot"></span>Humedad
          </span>
        </div>

        <div className="filter-section">
          <label className="filter-label">Filtrar por fecha:</label>
          <input
            type="date"
            className="filter-input"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* 🧾 Tabla detallada de datos */}
      <div className="table-container">
        <h2 className="chart-title">📜 Registros detallados</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Hora</th>
              <th>Temperatura (°C)</th>
              <th>Humedad (%)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((d, i) => (
                <tr key={i}>
                  <td>
                    {new Date(d.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{d.temperature?.toFixed(1)}</td>
                  <td>{d.humidity?.toFixed(1)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", color: "#94a3b8" }}>
                  No hay datos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        className="back-button"
        onClick={() => setCurrentPage("home")}
      >
        ⬅ Volver
      </button>
    </div>
  );
};

export default DataDetailScreen;
