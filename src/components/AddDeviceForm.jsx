import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { database, auth } from "../firebase";
import { useTranslation } from "react-i18next";

export default function AddDeviceForm() {
  const { t } = useTranslation();
  const [deviceName, setDeviceName] = useState("");
  const [message, setMessage] = useState("");

  const handleAddDevice = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert(t("devices.not_authenticated"));
    if (!deviceName.trim()) return alert(t("devices.enter_name"));

    try {
      await set(
        ref(database, `usuarios/${user.uid}/dispositivos/${deviceName}`),
        {
          createdAt: Date.now(),
          sensores: {},
        }
      );

      setMessage(t("devices.device_created", { deviceName }));
      setDeviceName("");
    } catch (err) {
      console.error(err);
      setMessage(t("devices.device_error"));
    }
  };

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <form onSubmit={handleAddDevice}>
        <input
          type="text"
          placeholder={t("devices.device_name_placeholder")}
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #334155",
            backgroundColor: "#273449",
            color: "white",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#14b8a6",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          ➕ {t("devices.add_device")}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
