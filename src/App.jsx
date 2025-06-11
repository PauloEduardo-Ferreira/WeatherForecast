import React, { useState } from "react";
import SearchBox from "./components/SearchBox/SearchBox";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import MapView from "./components/MapView/MapView";
import { getWeatherData } from "./services/WeatherService";
import "./App.css";

function App() {
  // Estado para armazenar os dados do clima
  const [weatherData, setWeatherData] = useState(null);
  // Estado para armazenar as coordenadas do local pesquisado
  const [coordinates, setCoordinates] = useState([-46.7899, -23.5317]); // Coordenadas iniciais
  // Estado para armazenar as cidades que foram pesquisadas
  const [searchedCities, setSearchedCities] = useState([]);

  // Função para lidar com a busca de uma cidade
  const handleSearch = async (city) => {
    try {
      // Chama a função para buscar dados do clima da cidade
      const weatherInfo = await getWeatherData(city);
      const { lat, lon } = weatherInfo.coord;

      // Atualiza as coordenadas e os dados do clima no estado
      setCoordinates([lon, lat]);
      setWeatherData(weatherInfo);
      // Adiciona a cidade pesquisada à lista de cidades consultadas, evitando duplicatas
      setSearchedCities((prev) => [...new Set([...prev, city])]);
    } catch (error) {
      // Exibe a mensagem de erro se a busca falhar
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Consulta de Previsão do Tempo</h1>
      <SearchBox onSearch={handleSearch} />

      <div className="weather-map-wrapper">
        <WeatherInfo weatherData={weatherData} />
        <MapView coordinates={coordinates} />
      </div>

      <div>
        <h2>Cidades Consultadas</h2>
        <select onChange={(e) => handleSearch(e.target.value)}>
          <option value="">Selecione uma cidade</option>
          {searchedCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
