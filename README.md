# React.js Weather Dashboard

## 🌦️ Overview
A React.js Weather Dashboard that fetches real-time weather data from OpenWeatherMap API. The application allows users to search for cities and displays current weather conditions with auto-updates every 30 seconds.

## 🚀 Features
- Search for a city and display weather details with next 5 days forecast.
- Show temperature, humidity, wind speed, and weather condition.
- Displays an appropriate weather icon.
- Polls the API every 30 seconds for real-time updates.
- Saves the last searched city in local storage.
- Error handling for invalid city names and network failures.
- Uses React Context API for state management.

## 🛠️ Tech Stack
- **React.js** (Vite for fast build)
- **Styled Components** for styling
- **React Context API** for state management
- **OpenWeatherMap API** for real-time weather data

## 📦 Installation & Setup
```bash
# Clone the repository
git clone https://github.com/your-username/react-weather-dashboard.git

# Navigate to the project folder
cd react-weather-dashboard

# Install dependencies
npm install

# Create a .env file and add your API key
REACT_APP_OPENWEATHER_API_KEY=''
REACT_APP_OPENWEATHER_API_URL=''

# Start the application
npm start
```


## 📂 Project Structure
```bash
📦 react-weather-dashboard
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 SearchInput.js      # Search input component
 ┃ ┃ ┣ 📜 WeatherDisplay.js # Displays weather info
 ┃ ┣ 📂 context
 ┃ ┃ ┣ 📜 WeatherContext.js # Context API setup
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 WeatherDashboard.js # Dashboard page
 ┃ ┣ 📜 App.js              # Main application
 ┃ ┣ 📜 index.js            # Entry point
 ┃ ┣ 📜 index.css           # styles of body
 ┣ 📜 .env                  # API Key (ignored in .gitignore)
 ┣ 📜 package.json
 ┣ 📜 README.md
```

## 🎨 UI Preview
![image](https://github.com/user-attachments/assets/b0428c45-c271-4289-bb62-510569094fc2)



## 📜 License
This project is open-source and available under the **MIT License**.
