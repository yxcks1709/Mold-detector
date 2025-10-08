import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { database, auth } from "../firebase";

export default function AddDeviceForm() {
  const [deviceName, setDeviceName] = useState("");
  const [message, setMessage] = useState("");

  const handleAddDevice = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("⚠️ No estás autenticado.");

    if (!deviceName.trim()) return alert("⚠️ Escribe un nombre.");

    try {
      await set(ref(database, `usuarios/${user.uid}/dispositivos/${deviceName}`), {
        createdAt: Date.now(),
        sensores: {}
      });
      setMessage(`✅ Dispositivo "${deviceName}" creado.`);
      setDeviceName("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error al crear el dispositivo.");
    }
  };

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <form onSubmit={handleAddDevice}>
        <input
          type="text"
          placeholder="Nombre del dispositivo"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #334155",
            backgroundColor: "#273449",
            color: "white",
            marginRight: "10px"
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
            cursor: "pointer"
          }}
        >
          ➕ Add Device
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
