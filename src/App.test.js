import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the weather forecast title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Consulta de Previsão do Tempo/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders the search box", () => {
  render(<App />);
  const searchBoxElement = screen.getByRole("textbox");
  expect(searchBoxElement).toBeInTheDocument();
});

test("renders the cities consulted title", () => {
  render(<App />);
  const citiesTitleElement = screen.getByText(/Cidades Consultadas/i);
  expect(citiesTitleElement).toBeInTheDocument();
});

test("renders the select dropdown for cities", () => {
  render(<App />);
  const selectElement = screen.getByRole("combobox");
  expect(selectElement).toBeInTheDocument();
});
