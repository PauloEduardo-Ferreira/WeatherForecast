// src/components/SearchBox/SearchBox.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBox from "./SearchBox";

// Mock para a função de alerta
global.alert = jest.fn();

test("renders input and button", () => {
  render(<SearchBox onSearch={() => {}} />);
  const inputElement = screen.getByPlaceholderText(/digite a cidade/i);
  const buttonElement = screen.getByRole("button");
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test("calls onSearch with the input value when submitted", () => {
  const mockOnSearch = jest.fn();
  render(<SearchBox onSearch={mockOnSearch} />);

  const inputElement = screen.getByPlaceholderText(/digite a cidade/i);
  const buttonElement = screen.getByRole("button");

  fireEvent.change(inputElement, { target: { value: "São Paulo" } });
  fireEvent.click(buttonElement);

  expect(mockOnSearch).toHaveBeenCalledWith("São Paulo");
});

test("shows alert when input is empty", () => {
  render(<SearchBox onSearch={() => {}} />);

  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);

  expect(global.alert).toHaveBeenCalledWith("Por favor, digite uma cidade.");
});

test("does not call onSearch when input is empty", () => {
  const mockOnSearch = jest.fn();
  render(<SearchBox onSearch={mockOnSearch} />);

  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);

  expect(mockOnSearch).not.toHaveBeenCalled();
});
