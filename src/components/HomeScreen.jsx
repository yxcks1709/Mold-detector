import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import { database, auth } from "../firebase";
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
}) => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [latestData, setLatestData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const convertTemp = (temp) =>
    isCelsisus ? temp.toFixed(1) : ((temp * 9) / 5 + 32).toFixed(1);

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
      if (list.length > 0 && !selectedDevice) {
        setSelectedDevice(list[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedDevice) return;
    const user = auth.currentUser;
    if (!user) return;

    const deviceRef = ref(
      database,
      `usuarios/${user.uid}/sensores/${selectedDevice}`
    );

    const unsubscribe = onValue(deviceRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setLatestData(null);
        setChartData([]);
        setLoading(false);
        return;
      }

      const entries = Object.entries(data).map(([id, v]) => ({
        id,
        ...v,
        time: v.timestamp
          ? new Date(v.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "No time",
      }));

      const threeHoursAgo = Date.now() - 3 * 60 * 60 * 1000;
      const last3hData = entries.filter((e) => e.timestamp >= threeHoursAgo);

      const filteredEvery5Min = [];
      let lastTime = 0;
      const interval = 5 * 60 * 1000;

      for (const entry of last3hData) {
        if (entry.timestamp - lastTime >= interval) {
          filteredEvery5Min.push(entry);
          lastTime = entry.timestamp;
        }
      }

      setLatestData(filteredEvery5Min.at(-1));
      setChartData(filteredEvery5Min);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedDevice]);

  const tempValue = latestData ? convertTemp(latestData.temperature) : "--";
  const humidValue = latestData?.humidity ?? "--";
  const uvValue = latestData?.uv?.toFixed(1) ?? "--";

  const tempLimitInCelsius = isCelsisus
    ? tempAlertLimit
    : ((tempAlertLimit - 32) * 5) / 9;

  const status =
    latestData &&
    (latestData.temperature > tempLimitInCelsius ||
      latestData.humidity > humidAlertLimit ||
      latestData.uv > 8)
      ? "Alert"
      : "Normal";

  return (
    <div className="home-container">
      <h1 className="home-title">📊 Dashboard</h1>

      {devices.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#94a3b8" }}>
          No devices found. Add one from the Settings page.
        </p>
      )}

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading Data...</p>
      ) : (
        <>
          <div className="data-box">
            <div className="data-header">
              <label htmlFor="device-select" className="device-label">
                📡 Select Device:
              </label>
              <select
                id="device-select"
                className="device-dropdown"
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
              >
                <option value="">-- Choose a device --</option>
                {devices.map((device) => (
                  <option key={device.id} value={device.id}>
                    {device.name}
                  </option>
                ))}
              </select>
            </div>

            <h2 style={{ textAlign: "center", marginTop: "12px" }}>
              Data for:{" "}
              {devices.find((d) => d.id === selectedDevice)?.name || "Device"}
            </h2>

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
              <div className="data-card">
                <p className="data-value uv-value">{uvValue}</p>
                <p className="data-label">UV Index</p>
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
            <h2 style={{ marginBottom: "12px" }}>Graph (Last 3 hours)</h2>
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
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#f59e0b"
                    name="UV Index"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ textAlign: "center", color: "#94a3b8" }}>
                No data in the last 3 hours.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
