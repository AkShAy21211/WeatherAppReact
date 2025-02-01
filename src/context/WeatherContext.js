import { createContext, useEffect, useState } from "react";
export const WeatherContext = createContext();

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const API_URL = process.env.REACT_APP_OPENWEATHER_API_URL;
const FORECAST_URL = process.env.REACT_APP_OPENWEATHER_API_URL;

const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "");
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(
    JSON.parse(localStorage.getItem("lastForcast")) || []

  );

  useEffect(() => {
    // check if previous searched city exists
    if (city) {
      fetchWeather(city);
    }
    // polling to update every 30s
    const interval = setInterval(() => {
      if (city) fetchWeather(city);
    }, 30000);
    return () => clearInterval(interval);
  }, [city]);

  // handler for fetching city weather
  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `${API_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      const { coord } = data;

      setWeather(data);
      setError(null);
      localStorage.setItem("lastCity", cityName);
      fetchWeatherForecast(coord.lat, coord.lon);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const fetchWeatherForecast = async (lat, lon) => {
    try {
        const response = await fetch(
            `${FORECAST_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error("Forecast data not available");
        const data = await response.json();

        // Extract list and filter only one entry per day (e.g., 12:00 PM)
        const dailyForecast = [];
        const usedDates = new Set();

        data.list.forEach((entry) => {
            const date = entry.dt_txt.split(" ")[0]; // Extract date (YYYY-MM-DD)
            const time = entry.dt_txt.split(" ")[1]; // Extract time (HH:MM:SS)

            // Select one forecast per day (e.g., closest to 12:00 PM)
            if (!usedDates.has(date) && time === "12:00:00") {
                dailyForecast.push(entry);
                usedDates.add(date);
            }
        });

        setForecast(dailyForecast);
        localStorage.setItem("lastForecast", JSON.stringify(dailyForecast));
    } catch (err) {
        setError(err.message);
        setForecast([]);
    }
};


  return (
    <WeatherContext.Provider
      value={{ weather, city, setCity,forecast, fetchWeather, error }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
