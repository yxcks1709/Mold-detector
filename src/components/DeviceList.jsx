import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { auth, database } from "../firebase";
import { useTranslation } from "react-i18next";

export default function DeviceList() {
  const { t } = useTranslation();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const devicesRef = ref(database, `usuarios/${user.uid}/dispositivos`);
    onValue(devicesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          name: key,
          sensors: data[key].sensores,
        }));
        setDevices(list);
      } else {
        setDevices([]);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <p>{t("devices.loading_devices")}</p>;

  return (
    <div className="device-container">
      <h2 className="device-title">{t("devices.my_devices")}</h2>

      {devices.length > 0 ? (
        <ul className="device-list">
          {devices.map((device, idx) => (
            <li key={idx} className="device-item">
              <h3>📍 {device.name}</h3>
              {device.sensors && (
                <p>
                  🌡️ {t("devices.temp")}: {device.sensors.temperature}°C – 💧{" "}
                  {t("devices.humidity")}: {device.sensors.humidity}% – ☀️{" "}
                  {t("devices.uv")}: {device.sensors.uv}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>{t("devices.no_devices_added")}</p>
      )}
    </div>
  );
}
