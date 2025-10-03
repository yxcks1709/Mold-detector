# 🦠 Mold Detector IoT Dashboard (곰팡이 탐지기 시스템)

🚀 A full IoT project designed to detect environmental conditions that promote mold growth, using physical sensors connected to an ESP8266, storing data in Firebase Realtime Database, and visualizing it in a React web dashboard.

## ⚙️ Key Features
- 🌡️ Real-time temperature and humidity monitoring with DHT22
- ☀️ UV index measurement with GUVA-S12SD
- ☁️ Real-time data storage with Firebase Realtime Database
- 👤 User authentication with Firebase Authentication
- 📊 Interactive dashboard built with React
- 📅 Historical data view with date filtering
- 📱 Fully responsive design for mobile and desktop

## 🌐 Live Demo

👉 [Click here to view the live demo](https://mold-detector.netlify.app/home)


## 📸 Preview

<img width="1870" height="882" alt="MoldDashboard" src="https://github.com/user-attachments/assets/e6058815-13b5-4456-abc3-b0f3366952b0" />

## 📖 Description

This IoT project monitors temperature, humidity, and UV radiation in real time to detect conditions favorable for mold growth indoors.

The data is collected by an ESP8266 board connected to DHT22 and GUVA-S12SD sensors, sent to Firebase, and displayed on a React dashboard.

✅ Goal: Prevent mold growth by identifying risky environmental conditions early.

## 🧰 Technologies Used
| Category | Technology |
|----------|------------|
| 💻 Frontend | React.js, Recharts, CSS |
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
git clone https://github.com/yourusername/mold-detector.git
cd mold-detector
npm install
npm run dev
```
## 📄 License

This project is licensed under the **MIT License**

---

📌 Developed by **YucksDev.**

