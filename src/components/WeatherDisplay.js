import { useContext } from "react";
import styled from "styled-components";
import { WeatherContext } from "../hooks/useWeather";


var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WeatherContainer = styled.div`
  color: white;
  padding: 30px;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  margin: 20px auto;
  text-align: center;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content */
  justify-content: center;

  h2 {
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: 600;
  }

  .temperature {
    font-size: 48px;
    font-weight: bold;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .condition {
    font-size: 20px;
    margin-bottom: 20px;
    text-transform: capitalize;
  }

  .weather-icon {
    width: 100px;
    height: 100px;
    margin: 10px 0;
  }

  .details {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
  }

  .details p {
    font-size: 16px;
    margin: 0;
    color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 600px) {
    padding: 20px;

    h2 {
      font-size: 24px;
    }

    .temperature {
      font-size: 40px;
    }

    .condition {
      font-size: 18px;
    }

    .details {
      flex-direction: column;
      gap: 10px;
    }
  }
`;

const ForecastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;

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
    width: 40px;
    height: 40px;
  }

  @media (max-width: 600px) {
    .forecast-item {
      flex-direction: column;
      gap: 5px;
    }
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
      <h2>{weather.name}</h2>
      <img src={iconUrl} alt={weather.weather[0].description} className="weather-icon" />
      <p className="temperature">{weather.main.temp}°C</p>
      <p className="condition">{weather.weather[0].description}</p>
      <div className="details">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>

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
