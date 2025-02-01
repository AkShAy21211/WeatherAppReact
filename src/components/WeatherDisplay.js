import { useContext } from "react";
import styled from "styled-components";
import { WeatherContext } from "../context/WeatherContext";

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WeatherContainer = styled.div`
  color: white;
  padding: 30px;
  width:90%;
  border-radius: 20px;
  margin: 20px auto;
  text-align: center;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-arround;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const MainWeather = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
  text-align: center;

  h2 {
    font-size: 32px;
    margin-bottom: 20px;
  }

  .temperature {
    font-size: 64px;
    font-weight: bold;
    margin: 20px 0;
  }

  .condition {
    font-size: 22px;
    text-transform: capitalize;
  }

  .weather-icon {
    width: 120px;
    height: 120px;
  }

  .details {
    display: flex;
    justify-content: space-around;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
    margin-top: 20px;
  }

  .details p {
    font-size: 18px;
  }
`;

const ForecastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 30px;
  width: 100%;

  .forecast-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .forecast-item:last-child {
    border-bottom: none;
  }

  .forecast-item span {
    flex: 1;
    text-align: center;
  }

  .forecast-item img {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    width: 100%;
  }
`;

const ErrorMessage = styled.p`
  color: rgb(255, 255, 255);
  padding: 15px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  margin: 20px auto;
  max-width: 400px;
  text-align: center;
`;

const NoDataMessage = styled.p`
  color: #f8f9fa;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
  margin: 20px auto;
  max-width: 400px;
  text-align: center;
`;

const WeatherDisplay = () => {
  const { weather, forecast, error } = useContext(WeatherContext);

  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!weather) return <NoDataMessage>No data available</NoDataMessage>;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <WeatherContainer>
      <MainWeather>
        <h2>{weather.name}</h2>
        <img src={iconUrl} alt={weather.weather[0].description} className="weather-icon" />
        <p className="temperature">{weather.main.temp}°C</p>
        <p className="condition">{weather.weather[0].description}</p>
        <div className="details">
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      </MainWeather>

      {/* 5-Day Forecast */}
      {forecast && (
        <ForecastWrapper>
          {forecast.map((item, index) => (
            <div key={index} className="forecast-item">
              <span>{days[new Date(item.dt * 1000).getDay()]}</span>
              <span>{item.main.temp}°C</span>
              <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
            </div>
          ))}
        </ForecastWrapper>
      )}
    </WeatherContainer>
  );
};

export default WeatherDisplay;
