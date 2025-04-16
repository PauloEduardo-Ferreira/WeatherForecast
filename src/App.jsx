import React, { useState } from 'react';
import SearchBox from './components/SearchBox/SearchBox'; // Importa o componente de busca
import WeatherInfo from './components/WeatherInfo/WeatherInfo'; // Importa o componente de informações do clima
import MapView from './components/MapView/MapView'; // Importa o componente de visualização do mapa
import { getWeatherData } from './services/WeatherService'; // Importa a função para buscar dados do clima
import './App.css'; // Importa o estilo CSS do aplicativo

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
      const { lat, lon } = weatherInfo.coord; // Obtém as coordenadas do retorno

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
      <h1>Consulta de Previsão do Tempo</h1> {/* Título do aplicativo */}
      <SearchBox onSearch={handleSearch} /> {/* Componente de busca */}

      <div className="weather-map-wrapper">
        <WeatherInfo weatherData={weatherData} /> {/* Componente que exibe as informações do clima */}
        <MapView coordinates={coordinates} /> {/* Componente que exibe o mapa com as coordenadas */}
      </div>

      <div>
        <h2>Cidades Consultadas</h2> {/* Título para a lista de cidades consultadas */}
        <select onChange={(e) => handleSearch(e.target.value)}> {/* Dropdown para selecionar cidades consultadas */}
          <option value="">Selecione uma cidade</option> {/* Opção padrão */}
          {searchedCities.map((city, index) => (
            <option key={index} value={city}>{city}</option> // Opções para cada cidade pesquisada
          ))}
        </select>
      </div>
    </div>
  );
}

export default App; // Exporta o componente App