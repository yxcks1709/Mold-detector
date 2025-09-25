import React, { useState, useEffect } from "react";
import "./HomeScreen.css";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const HomeScreen = ({
  tempAlertLimit = 28,
  humidAlertLimit = 70,
  isCelsisus = true,
  setCurrentPage,
}) => {
  const [latestData, setLatestData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sensorsRef = ref(database, "sensors");
    const unsubscribe = onValue(sensorsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("📥 Datos desde Firebase:", data);

      if (data) {
        const entries = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
          time: value.timestamp
            ? new Date(value.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Sin hora",
        }));
        const lastEntry = entries[entries.length - 1];
        setLatestData(lastEntry);
        const last24h = Date.now() - 24 * 60 * 60 * 1000;
        const filtered = entries.filter((e) => e.timestamp >= last24h);
        setChartData(filtered);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const tempValue = latestData?.temperature ?? "--";
  const humidValue = latestData?.humidity ?? "--";
  const status =
    latestData &&
    (latestData.temperature > tempAlertLimit ||
      latestData.humidity > humidAlertLimit)
      ? "Alert"
      : "Normal";

  return (
    <div className="home-container">
      <h1 className="home-title">Dashboard</h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading Data...</p>
      ) : (
        <>
          <div className="data-box">
            <h2 style={{ textAlign: "center" }}>Data results</h2>
            <div className="data-grid">
              <div className="data-card">
                <p className="data-value temp-value">
                  {tempValue}°{isCelsisus ? "C" : "F"}
                </p>
                <p className="data-label">Temperature</p>
              </div>
              <div className="data-card">
                <p className="data-value humid-value">{humidValue}%</p>
                <p className="data-label">Humidity</p>
              </div>
            </div>
            <p
              className={`status ${
                status === "Normal" ? "status-normal" : "status-alert"
              }`}
            >
              Status: {status}
            </p>
          </div>

          <div className="chart-box">
            <h2 style={{ marginBottom: "12px" }}>Graph (Last 24 h)</h2>
            {chartData.length > 0 ? (
              <div className="Graph">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="time" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#38bdf8"
                    name="Temperature (°C)"
                  />
                  <Line
                    type="monotone"
                    dataKey="humidity"
                    stroke="#a78bfa"
                    name="Humidity (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
              </div>
            ) : (
              <p style={{ textAlign: "center", color: "#94a3b8" }}>
                No data in last 24 h.
              </p>
            )}
          </div>

          <div className="button-grid">
            <button
              className="button button-teal"
              onClick={() => setCurrentPage("dataDetail")}
            >
              See Records
            </button>
            <button
              className="button button-teal"
              onClick={() => setCurrentPage("alerts")}
            >
              Alerts
            </button>
          </div>

          <div className="button-grid" style={{ marginTop: "16px" }}>
            <button
              className="button button-slate"
              onClick={() => setCurrentPage("settings")}
            >
              Settings
            </button>
            <button
              className="button button-slate"
              onClick={() => setCurrentPage("profile")}
            >
              Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
