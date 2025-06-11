import axios from "axios";
import { getWeatherData } from "./WeatherService";

jest.mock("axios");

describe("Testes da função getWeatherData", () => {
  it("deve retornar dados do clima para uma cidade válida", async () => {
    const city = "São Paulo";
    const mockGeoResponse = {
      data: {
        coord: { lat: -23.5505, lon: -46.6333 },
      },
    };

    const mockWeatherResponse = {
      data: {
        results: {
          city: "São Paulo",
          temp: 25,
          description: "Céu limpo",
          forecast: [{ rain_probability: 10 }],
          moon_phase: "Crescente",
        },
      },
    };

    axios.get.mockImplementation((url) => {
      if (url.includes("weather?q=")) {
        return Promise.resolve(mockGeoResponse);
      } else if (url.includes("weather?key=")) {
        return Promise.resolve(mockWeatherResponse);
      }
    });

    const data = await getWeatherData(city);

    expect(data).toEqual({
      city: "São Paulo",
      current: {
        temp: 25,
        description: "Céu limpo",
        rainProbability: 10,
      },
      forecast: mockWeatherResponse.data.results.forecast,
      moonPhase: "Crescente",
      coord: { lat: -23.5505, lon: -46.6333 },
    });
  });

  it("deve lançar um erro se a cidade não for encontrada", async () => {
    const city = "CidadeInexistente";
    const mockGeoResponse = {
      data: {},
    };

    axios.get.mockImplementation((url) => {
      return Promise.resolve(mockGeoResponse);
    });

    await expect(getWeatherData(city)).rejects.toThrow(
      "Cidade não encontrada."
    );
  });

  it("deve lançar um erro se as informações do clima não forem encontradas", async () => {
    const city = "São Paulo";
    const mockGeoResponse = {
      data: {
        coord: { lat: -23.5505, lon: -46.6333 },
      },
    };

    const mockWeatherResponse = {
      data: {
        results: {},
      },
    };

    axios.get.mockImplementation((url) => {
      if (url.includes("weather?q=")) {
        return Promise.resolve(mockGeoResponse);
      } else if (url.includes("weather?key=")) {
        return Promise.resolve(mockWeatherResponse);
      }
    });

    await expect(getWeatherData(city)).rejects.toThrow(
      "Não foi possível obter as informações do tempo."
    );
  });
});
