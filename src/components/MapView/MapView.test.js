import React from "react";
import { render, screen } from "@testing-library/react";
import MapView from "./MapView";

// Mockando o Mapa e as classes relacionadas do OpenLayers
jest.mock("ol", () => {
  return {
    Map: jest.fn().mockImplementation(() => ({
      setTarget: jest.fn(),
    })),
    View: jest.fn(),
    Feature: jest.fn(),
    TileLayer: jest.fn(),
    VectorLayer: jest.fn(),
    VectorSource: jest.fn(),
    Point: jest.fn(),
    fromLonLat: jest.fn((coords) => coords),
  };
});

describe("Componente MapView", () => {
  const coordenadasValidas = [-23.5317, -46.7899];
  const coordenadasInvalidas = [];

  test("é renderizado sem falhas", () => {
    render(<MapView coordinates={coordenadasValidas} />);
    const containerDoMapa = screen.getByTestId("map-container");
    expect(containerDoMapa).toBeInTheDocument();
  });

  test("exibe o mapa com coordenadas válidas", () => {
    render(<MapView coordinates={coordenadasValidas} />);
    const containerDoMapa = screen.getByTestId("map-container");
    expect(containerDoMapa).toBeInTheDocument();
  });

  test("lida com coordenadas inválidas de forma graciosa", () => {
    console.error = jest.fn();
    render(<MapView coordinates={coordenadasInvalidas} />);
    expect(console.error).toHaveBeenCalledWith(
      "Coordenadas inválidas:",
      coordenadasInvalidas
    );
  });

  test("atualiza o mapa quando as coordenadas mudam", () => {
    const { rerender } = render(<MapView coordinates={coordenadasValidas} />);
    const novasCoordenadas = [-23.5317, -46.7899];
    rerender(<MapView coordinates={novasCoordenadas} />);
  });
});
