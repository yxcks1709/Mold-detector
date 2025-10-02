import React, { useState, useEffect, useMemo } from "react";
import "./DataDetailScreen.css";
import { auth, database } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

const DataDetailScreen = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("⚠️ No hay usuario autenticado");
      return;
    }

    const uid = user.uid;
    console.log("📥 Leyendo datos desde:", `usuarios/${uid}/sensores`);

    const sensoresRef = ref(database, `usuarios/${uid}/sensores`);
    const unsubscribe = onValue(sensoresRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setHistoricalData([]);
        return;
      }

      const entries = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));
      entries.sort((a, b) => a.timestamp - b.timestamp);
      setHistoricalData(entries);
    });

    return () => unsubscribe();
  }, []);

  const filteredData = useMemo(() => {
    if (!selectedDate) return historicalData;
    return historicalData.filter((d) => {
      const date = new Date(d.timestamp).toISOString().split("T")[0];
      return date === selectedDate;
    });
  }, [historicalData, selectedDate]);

  return (
    <div className="data-container">
      <h1 className="data-title">📊 Sensor Data History</h1>

      <div className="filter-section">
        <label className="filter-label">Filter by date:</label>
        <input
          type="date"
          className="filter-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button className="filter-button" onClick={() => setSelectedDate("")}>
          View all
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Time</th>
              <th>Temperature (°C)</th>
              <th>Humidity (%)</th>
              <th>UV Index</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((d, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {new Date(d.timestamp).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td>
                    {new Date(d.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{d.temperature?.toFixed(1)}</td>
                  <td>{d.humidity?.toFixed(1)}</td>
                  <td>{d.uv?.toFixed(1)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#94a3b8" }}>
                  No Data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button className="back-button" onClick={() => navigate("/home")}>
        Home
      </button>
    </div>
  );
};

export default DataDetailScreen;
