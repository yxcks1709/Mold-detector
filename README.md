# 🦠 Mold Detector IoT Dashboard (곰팡이 탐지기 시스템)

🚀 An end-to-end IoT system that detects environmental conditions favorable for mold growth, using physical sensors (ESP8266 + DHT22 + UV Sensor) connected to Firebase, and visualized in a React-based real-time dashboard.

## ⚙️ Key Features
- 🌡️ Real-time temperature and humidity monitoring with DHT22
- ☀️ UV index measurement with GUVA-S12SD
- ☁️ Real-time data storage with Firebase Realtime Database
- 👤 User authentication with Firebase Authentication
- 📊 Interactive dashboard built with React
- 📅 Historical data view with date filtering
- ⚙️ Custom settings: alert thresholds, theme (Light/Dark), and language (🇰🇷/🇪🇸/🇺🇸)
- ⚠️ Smart alert system that detects risky mold-growth conditions in the last 3 hours
- 📱 Fully responsive design for mobile and desktop

## 🌐 Live Demo

👉 [Click here to view the live demo](https://mold-detector.netlify.app/)


## 📸 Preview

<img width="743" height="861" alt="image" src="https://github.com/user-attachments/assets/8ffbd72d-4dee-45a1-8e2c-a27f4467c76d" />


## 📖 Description

This system continuously measures temperature, humidity, and UV radiation to predict when indoor environments become prone to mold growth.
All data is sent to Firebase in real time and displayed on a modern React dashboard.

✅ Goal: Prevent mold growth by automatically detecting and alerting users when humidity and temperature exceed safe levels.

## 🧾 How It Works (Step-by-Step)

1- Register / Login:
Users create an account through Firebase Authentication.

2- Add Device (웹에서):
In Settings → Add Device, create a slot for your ESP8266 device.

3- Connect via Phone Hotspot (휴대폰 연결):
Turn on your phone hotspot with the same SSID/password used in the firmware.
When powered, the ESP8266 automatically uploads sensor data to your Firebase path:
usuarios/{uid}/devices/{deviceID}/sensores

4- View Dashboard:
See real-time readings (temperature, humidity, UV) updated every few minutes.
If limits are exceeded, an ⚠️ “Mold Risk Detected” alert appears.

5- View Dashboard:
See real-time readings (temperature, humidity, UV) updated every few minutes.
If limits are exceeded, an ⚠️ “Mold Risk Detected” alert appears.

6- Check History & Alerts:
Filter past data by date or device; monitor last 3h conditions to prevent mold growth.

## 🧰 Technologies Used
| Category | Technology |
|----------|------------|
| 💻 Frontend | React.js(vite), Recharts, CSS, i18next |
| ☁️ Backend | Firebase Realtime Database, Firebase Auth |
| 📡 Hardware | ESP8266 (NodeMCU), DHT22, GUVA-S12SD |
| ⚙️ Others | HTML5, JavaScript (ES6+), Netlify |

## 📡 System Architecture

🌡️ Sensors (DHT22, GUVA-S12SD)
              │
              ▼
📶 ESP8266 Microcontroller
              │
              ▼
☁️ Firebase Realtime Database
              │
              ▼
💻 React Web Dashboard
              │
              ▼
📱 Mobile & Desktop Access

## 🛠️ Installation & Usage

```bash
git clone https://github.com/yxcks1709/Mold-detector.git
cd Mold-detector
npm install
npm run dev
```
## 📄 License

This project is licensed under the **MIT License**

---

📌 Developed by **YucksDev.**

