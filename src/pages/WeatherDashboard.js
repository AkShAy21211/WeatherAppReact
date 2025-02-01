import styled from "styled-components";
import WeatherProvider from "../context/WeatherContext";
import SearchInput from "../components/SearchInput";
import WeatherDisplay from "../components/WeatherDisplay";


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  text-align: center;
`;
const WeatherDashboard = () => {
  return (
    <WeatherProvider>
      <AppContainer>
        {/* <h1>Weather Dashboard</h1> */}
        <SearchInput />
        <WeatherDisplay />
      </AppContainer>
    </WeatherProvider>
  );
};

export default WeatherDashboard;
