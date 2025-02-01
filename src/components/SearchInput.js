import { useContext, useState } from "react";
import styled from "styled-components";
import { WeatherContext } from "../hooks/useWeather";

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;

  input {
    padding: 12px;
    border-radius: 8px;
    width: 250px;
    color:white;
    font-size: 16px;
    background: transparent;
    outline: none;
    transition: border-color 0.3s ease;
  }
  ::placeholder {
    color: white;
    opacity: .7;
  }
  button {
    padding: 12px 20px;
    background-color:rgb(206, 132, 13);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease, transform 0.2s ease;


  }

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;

    input {
      width: 100%;
    }

    button {
      width: 100%;
    }
  }
`;

const SearchInput = () => {
  const { setCity, fetchWeather } = useContext(WeatherContext);
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input) {
      setCity(input);
      fetchWeather(input);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter city"
      />
      <button onClick={handleSearch}>Search</button>
    </SearchContainer>
  );
};

export default SearchInput;
