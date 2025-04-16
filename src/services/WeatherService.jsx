import axios from 'axios';

// Chave da API para autenticação
const API_KEY = '16a080a679c94b82261020511ee78a66';
// URL base da API de clima
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Função assíncrona para obter dados do clima com base na cidade
export const getWeatherData = async (city) => {
  try {
    // Chamada à API para obter dados geográficos da cidade
    const geoResponse = await axios.get(`${WEATHER_API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}`);
    const geoData = geoResponse.data; // Armazena a resposta da API

    // Verifica se os dados geográficos foram retornados corretamente
    if (!geoData || !geoData.coord) {
      throw new Error('Cidade não encontrada.'); // Lança um erro se a cidade não for encontrada
    }

    // Desestrutura as coordenadas (latitude e longitude) da resposta
    const { lat, lon } = geoData.coord;

    // Chamada à API de previsão do tempo usando as coordenadas obtidas
    const weatherResponse = await axios.get(`weather?key=c6e05307&lat=${lat}&lon=${lon}&user_ip=remote`);
    const weatherInfo = weatherResponse.data.results; // Armazena a resposta da API de previsão

    // Verifica se as informações do clima foram retornadas corretamente
    if (!weatherInfo || !weatherInfo.city) {
      throw new Error('Não foi possível obter as informações do tempo.'); // Lança um erro se as informações não forem encontradas
    }

    // Retorna um objeto com os dados relevantes do clima
    return {
      city: weatherInfo.city, // Nome da cidade
      current: {
        temp: weatherInfo.temp, // Temperatura atual
        description: weatherInfo.description, // Descrição do clima atual
        rainProbability: weatherInfo.forecast[0].rain_probability, // Probabilidade de chuva
      },
      forecast: weatherInfo.forecast, // Previsão do tempo
      moonPhase: weatherInfo.moon_phase, // Fase da lua
          coord: { lat, lon }, // Coordenadas da cidade
        }; // Fecha o objeto retornado
      } catch (error) {
        console.error('Erro ao obter os dados do clima:', error.message);
        throw error; // Repassa o erro para ser tratado pelo chamador
      }

};
