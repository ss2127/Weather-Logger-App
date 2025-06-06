# 🌦️ Weather Logger App

A full-stack web application that allows users to:
- Search for real-time weather data by city
- View the local time in the searched location
- Save and manage weather logs tied to their account
- Log in securely with JWT-based authentication

---

## 🚀 Features

- 🔍 Search weather by city (via OpenWeatherMap API)
- 🕒 See the current **local time** in the city
- 💾 Save and display previous weather logs
- 🗑️ Delete individual or all logs
- 🔐 Log in/out with token authentication
- 👋 Personalized greeting: “Hi, [user]!”

---

## 🛠️ Tech Stack

**Frontend:**
- HTML, CSS, JavaScript

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- OpenWeatherMap API

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-logger-web-app.git
cd weather-logger-app

### 2. Backend setup
cd weather-backend
npm init -y

3.
Create a .env file in weather-backend/:

DATABASE=mongodb+srv://your-db-uri
JWT_SECRET=your_jwt_secret
WEATHER_API_KEY=your_openweather_api_key
JWT_EXPIRES_IN=1d

Then Start Server:
npm run dev

3. Frontend Setup
Open weather-frontend/index.html in your browser.
You can also use Live Server in VS Code for auto-reloading.

Future Improvements:

Mobile responsiveness

Edit log functionality

Deploy backend (Render) + frontend (Vercel)

🧑‍💻 Author
Developed by Samuel Ly
