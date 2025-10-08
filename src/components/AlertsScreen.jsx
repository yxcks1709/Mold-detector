import React, { useEffect, useState } from "react";
import "./AlertsScreen.css";
import { auth, database } from "../firebase";
import { ref, onValue } from "firebase/database";

const AlertsScreen = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("⚠️ No authenticated user");
      return;
    }

    const uid = user.uid;
    const sensorsRef = ref(database, `usuarios/${uid}/sensores`);

    onValue(sensorsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setAlerts([]);
        return;
      }

      const now = Date.now();
      const threeHoursAgo = now - 3 * 60 * 60 * 1000;

      const recentData = Object.values(data).filter(
        (entry) => entry.timestamp >= threeHoursAgo
      );

      if (recentData.length === 0) {
        setAlerts([]);
        return;
      }

      const allConditionsMet = recentData.every(
        (entry) =>
          entry.temperature > 25 &&
          entry.humidity > 70 &&
          entry.uv < 5 
      );

      if (allConditionsMet) {
        setAlerts([
          {
            type: "⚠️ Mold Growth Risk",
            message:
              "Favorable conditions for mold growth have been present continuously for the last 3 hours.",
            timestamp: now,
          },
        ]);
      } else {
        setAlerts([]);
      }
    });
  }, []);

  return (
    <div className="alerts-container">
      <h1 className="alerts-title">Mold Alerts</h1>

      <div className="alerts-box">
        {alerts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#94a3b8" }}>
            ✅ No continuous mold risk detected in the last 3 hours.
          </p>
        ) : (
          <ul className="alerts-list">
            {alerts.map((alert, index) => (
              <li key={index} className="alert-item">
                <p className="alert-type">{alert.type}</p>
                <p className="alert-message">{alert.message}</p>
                <p className="alert-timestamp">
                  {new Date(alert.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AlertsScreen;
