import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherInfo from "../WeatherInfo/WeatherInfo";

// Mock das imagens
jest.mock("../../assets/imgs_moon/new.png", () => "newMoon.png");
jest.mock(
  "../../assets/imgs_moon/waxing_crescent.png",
  () => "waxingCrescent.png"
);
jest.mock("../../assets/imgs_moon/first_quarter.png", () => "firstQuarter.png");
jest.mock(
  "../../assets/imgs_moon/waxing_gibbous.png",
  () => "waxingGibbous.png"
);
jest.mock("../../assets/imgs_moon/full_moon.png", () => "fullMoon.png");
jest.mock(
  "../../assets/imgs_moon/waning_gibbous.png",
  () => "waningGibbous.png"
);
jest.mock("../../assets/imgs_moon/last_quarter.png", () => "lastQuarter.png");
jest.mock(
  "../../assets/imgs_moon/waning_crescent.png",
  () => "waningCrescent.png"
);

jest.mock("../../assets/imgs/clear_day.svg", () => "clearDay.svg");
jest.mock("../../assets/imgs/clear_night.svg", () => "clearNight.svg");
jest.mock("../../assets/imgs/cloud.svg", () => "cloud.svg");
jest.mock("../../assets/imgs/cloudly_day.svg", () => "cloudlyDay.svg");
jest.mock("../../assets/imgs/cloudly_night.svg", () => "cloudlyNight.svg");
jest.mock("../../assets/imgs/fog.svg", () => "fog.svg");
jest.mock("../../assets/imgs/hail.svg", () => "hail.svg");
jest.mock("../../assets/imgs/none_day.svg", () => "noneDay.svg");
jest.mock("../../assets/imgs/none_night.svg", () => "noneNight.svg");
jest.mock("../../assets/imgs/rain.svg", () => "rain.svg");
jest.mock("../../assets/imgs/snow.svg", () => "snow.svg");
jest.mock("../../assets/imgs/storm.svg", () => "storm.svg");

describe("WeatherInfo", () => {
  const mockWeatherData = {
    city: "São Paulo",
    current: {
      temp: 25,
      description: "Tempo limpo",
      rainProbability: 10,
    },
    forecast: [
      {
        date: "15/04",
        max: 30,
        min: 20,
        description: "Tempo limpo",
        rain_probability: 5,
      },
      {
        date: "16/04",
        max: 28,
        min: 18,
        description: "Parcialmente nublado",
        rain_probability: 10,
      },
      {
        date: "17/04",
        max: 26,
        min: 16,
        description: "Chuva",
        rain_probability: 20,
      },
      {
        date: "18/04",
        max: 27,
        min: 17,
        description: "Sol",
        rain_probability: 15,
      },
      {
        date: "19/04",
        max: 29,
        min: 19,
        description: "Nublado",
        rain_probability: 25,
      },
    ],
    moonPhase: "full",
  };

  it("renders weather information correctly", () => {
    render(<WeatherInfo weatherData={mockWeatherData} />);

    expect(screen.getByText(/São Paulo/i)).toBeInTheDocument();
    expect(screen.getByText(/Atual: 25°/i)).toBeInTheDocument();
    expect(screen.getByText(/Máx.: 30° \/ Mín.: 20°/i)).toBeInTheDocument();
    expect(screen.getByText(/Clima: Tempo limpo/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Probabilidade de Chuva: 10%/i)
    ).toBeInTheDocument();
    expect(screen.getByAltText(/Clima: Tempo limpo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Fase da Lua: full/i)).toBeInTheDocument();
  });

  it("renders null when no weather data is provided", () => {
    const { container } = render(<WeatherInfo weatherData={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders forecast information correctly", () => {
    render(<WeatherInfo weatherData={mockWeatherData} />);

    // Verifica se as informações da previsão do tempo estão sendo exibidas corretamente
    const forecastItems = screen.getAllByRole("listitem");
    expect(forecastItems).toHaveLength(3);

    // Verifica o primeiro item da previsão (Amanhã)
    expect(forecastItems[0]).toHaveTextContent("16/04");
    expect(forecastItems[0]).toHaveTextContent("↑ 26° / ↓ 16°");
    expect(forecastItems[0]).toHaveTextContent("Clima: Chuva");
    expect(forecastItems[0]).toHaveTextContent("Chance de Chuva: 20%");

    // Verifica o segundo item da previsão (Dia seguinte)
    expect(forecastItems[1]).toHaveTextContent("17/04");
    expect(forecastItems[1]).toHaveTextContent("↑ 27° / ↓ 17°");
    expect(forecastItems[1]).toHaveTextContent("Clima: Sol");
    expect(forecastItems[1]).toHaveTextContent("Chance de Chuva: 15%");

    // Verifica o terceiro item da previsão (Dia após o seguinte)
    expect(forecastItems[2]).toHaveTextContent("18/04");
    expect(forecastItems[2]).toHaveTextContent("↑ 29° / ↓ 19°");
    expect(forecastItems[2]).toHaveTextContent("Clima: Nublado");
    expect(forecastItems[2]).toHaveTextContent("Chance de Chuva: 25%");
  });
});
