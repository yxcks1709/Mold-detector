import React, { useState, useEffect, useMemo } from "react";
import "./DataDetailScreen.css";
import { auth, database } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DataDetailScreen = () => {
  const { t } = useTranslation();
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [historicalData, setHistoricalData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("⚠️ No authenticated user");
      return;
    }

    const uid = user.uid;
    const devicesRef = ref(database, `usuarios/${uid}/devices`);

    const unsubscribeDevices = onValue(devicesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setDevices([]);
        return;
      }
      const deviceNames = Object.keys(data);
      setDevices(deviceNames);
      if (!selectedDevice && deviceNames.length > 0) {
        setSelectedDevice(deviceNames[0]);
      }
    });

    return () => unsubscribeDevices();
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user || !selectedDevice) return;

    const uid = user.uid;
    const sensoresPath = `usuarios/${uid}/devices/${selectedDevice}/sensores`;

    console.log("📥 Leyendo datos desde:", sensoresPath);

    const sensoresRef = ref(database, sensoresPath);
    const unsubscribeData = onValue(sensoresRef, (snapshot) => {
      const data = snapshot.val();
      console.log("🔥 Datos en Firebase:", data);
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

    return () => unsubscribeData();
  }, [selectedDevice]);

  const filteredData = useMemo(() => {
    if (!selectedDate) return historicalData;
    return historicalData.filter((d) => {
      const date = new Date(d.timestamp).toISOString().split("T")[0];
      return date === selectedDate;
    });
  }, [historicalData, selectedDate]);

  return (
    <div className="data-container">
      <h1 className="data-title">{t("data.sensor_history")}</h1>

      <div className="device-selector">
        <label>{t("data.device_name", "Device")}:</label>
        <select
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
          className="device-select"
        >
          {devices.map((device) => (
            <option key={device} value={device}>
              {device}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">{t("data.filter_date")}:</label>
        <input
          type="date"
          className="filter-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button className="filter-button" onClick={() => setSelectedDate("")}>
          {t("data.view_all")}
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t("data.table_headers.id")}</th>
              <th>{t("data.table_headers.date")}</th>
              <th>{t("data.table_headers.time")}</th>
              <th>{t("data.table_headers.temperature")}</th>
              <th>{t("data.table_headers.humidity")}</th>
              <th>{t("data.table_headers.uv")}</th>
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
                  <td>{d.uv?.toFixed(3)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", color: "#94a3b8" }}
                >
                  {t("data.no_data")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button className="back-button" onClick={() => navigate("/home")}>
        {t("data.home")}
      </button>
    </div>
  );
};

export default DataDetailScreen;
