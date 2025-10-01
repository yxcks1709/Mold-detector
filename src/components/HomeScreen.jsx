import React, { useState, useEffect } from "react";
import "./HomeScreen.css";
import { database, auth } from "../firebase";
import { ref, onValue, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
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
}) => {
  const [latestData, setLatestData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const convertTemp = (temp) =>
    isCelsisus ? temp.toFixed(1) : ((temp * 9) / 5 + 32).toFixed(1);
  const saveSensorDataForUser = async (data) => {
    const user = auth.currentUser;
    if (!user) return console.log("⚠️ Ningún usuario autenticado");
    const uid = user.uid;
    await Promise.all(
      Object.entries(data).map(([id, sensorData]) =>
        set(ref(database, `usuarios/${uid}/sensores/${id}`), sensorData)
      )
    );
    console.log(`✅ Datos copiados en usuarios/${uid}`);
  };

  useEffect(() => {
  const unsubscribe = onValue(ref(database, "sensors"), async (snapshot) => {
    const data = snapshot.val();
    if (!data) return setLoading(false);

    const entries = Object.entries(data).map(([id, v]) => ({
      id,
      ...v,
      time: v.timestamp
        ? new Date(v.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Sin hora",
    }));

    const threeHoursAgo = Date.now() - 3 * 60 * 60 * 1000;
    const last3hData = entries.filter((e) => e.timestamp >= threeHoursAgo);
    const filteredEvery5Min = [];
    let lastTime = 0;
    const interval = 5 * 60 * 1000; // 5 minutos en ms

    for (const entry of last3hData) {
      if (entry.timestamp - lastTime >= interval) {
        filteredEvery5Min.push(entry);
        lastTime = entry.timestamp;
      }
    }

    setLatestData(filteredEvery5Min.at(-1));
    setChartData(filteredEvery5Min);

    await saveSensorDataForUser(data);
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

  const tempValue = latestData ? convertTemp(latestData.temperature) : "--";
  const humidValue = latestData?.humidity ?? "--";
  const tempLimitInCelsius = isCelsisus
    ? tempAlertLimit
    : ((tempAlertLimit - 32) * 5) / 9;

  const status =
    latestData &&
    (latestData.temperature > tempLimitInCelsius ||
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
                    name={`Temperature (°${isCelsisus ? "C" : "F"})`}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="humidity"
                    stroke="#a78bfa"
                    name="Humidity (%)"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ textAlign: "center", color: "#94a3b8" }}>
                No data in last 24 h.
              </p>
            )}
          </div>
          <div className="button-grid">
            <button className="button button-teal" onClick={() => navigate("/data")}>
              See Records
            </button>
            <button className="button button-teal" onClick={() => navigate("/alerts")}>
              Alerts
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
