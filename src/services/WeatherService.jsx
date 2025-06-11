import axios from "axios";

// Chave da API para autenticação
const API_KEY = process.env.REACT_APP_API_GEOCODING_KEY;
// URL base da API de clima
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Função assíncrona para obter dados do clima com base na cidade
export const getWeatherData = async (city) => {
  try {
    // Chamada à API para obter dados geográficos da cidade
    const geoResponse = await axios.get(
      `${WEATHER_API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}`
    );
    const geoData = geoResponse.data;

    // Verifica se os dados geográficos foram retornados corretamente
    if (!geoData || !geoData.coord) {
      throw new Error("Cidade não encontrada.");
    }

    // Desestrutura as coordenadas (latitude e longitude) da resposta
    const { lat, lon } = geoData.coord;

    // Chamada à API de previsão do tempo usando as coordenadas obtidas
    const weatherResponse = await axios.get(
      `weather?key=${process.env.REACT_APP_WEATHER_API_KEY}&lat=${lat}&lon=${lon}&user_ip=remote`
    );
    const weatherInfo = weatherResponse.data.results;

    // Verifica se as informações do clima foram retornadas corretamente
    if (!weatherInfo || !weatherInfo.city) {
      throw new Error("Não foi possível obter as informações do tempo.");
    }

    return {
      city: weatherInfo.city,
      current: {
        temp: weatherInfo.temp,
        description: weatherInfo.description,
        rainProbability: weatherInfo.forecast[0].rain_probability,
      },
      forecast: weatherInfo.forecast,
      moonPhase: weatherInfo.moon_phase,
      coord: { lat, lon },
    };
  } catch (error) {
    console.error("Erro ao obter os dados do clima:", error.message);
    throw error;
  }
};
