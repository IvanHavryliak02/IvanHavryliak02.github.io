# 🌦️ Weather App

**Weather App** is a web widget that displays real-time weather forecasts for cities around the world.  
It automatically detects the user's **time**, **date**, and **geolocation** (if permission is granted), providing an accurate local weather report.  

Users can also manually enter a city name or select one from a dropdown menu.  
If the requested city is available in the weather API, its forecast will be displayed.  
Otherwise, the app shows the message:  
> `Can't find city, country`

---

## ✨ Features

- 🌍 Displays current weather and forecast for any city worldwide  
- 📍 Supports user **geolocation** for instant local weather  
- ⌚ Takes into account **current time and date** for accurate results  
- 🔎 Allows users to **search or select** cities manually  
- 🚫 Graceful error handling with a clear "Can't find city, country" message  
- 🧠 Fully built with **vanilla JavaScript**, no external frameworks  
- 🎨 Minimal and responsive interface  

---

## ⚙️ How It Works

1. When the app loads, it requests permission to access your location.  
2. If granted, the widget automatically displays the weather for your current city.  
3. If denied, the user can manually search or select a city from the dropdown list.  
4. The app fetches weather data from an external **weather API** and updates the UI dynamically.  
5. If the API doesn’t return results for a given city, a friendly error message appears.

---

## 🧰 Technologies Used

- **JavaScript (ES6+)**
- **HTML5**
- **SASS (CSS preprocessor)**
- **Opencage Geolocation API** https://opencagedata.com
- **Open Meteo API** https://open-meteo.com/

## 💡 Development Note

This project was created as part of a personal challenge to explore **core JavaScript** and build a complete, functional web application **without using frameworks**.  
All rendering, styling, and logic are handled through **custom JS code**.

---

## Live Demo

A live demo of the Pulse landing page is available here:  
[WeatherApp Demo](https://ivanhavryliak02.github.io/WeatherApp/dist/index.html)

---

## Projects

You can find other projects I have worked on here:  
- [Pulse](https://ivanhavryliak02.github.io/Pulse/dist/index.html)  
- [Portfolio](https://ivanhavryliak02.github.io/Portfolio/dist/index.html)  
- [Encrypto](https://ivanhavryliak02.github.io/Encrypto/dist/index.html)  
- [TPass](https://ivanhavryliak02.github.io/TeaPass/dist/index.html)