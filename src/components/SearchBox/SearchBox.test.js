// src/components/SearchBox/SearchBox.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';

// Mock para a função de alerta
global.alert = jest.fn();

test('renders input and button', () => {
    render(<SearchBox onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/digite a cidade/i);
    const buttonElement = screen.getByRole('button'); // Obtém o botão de busca
    expect(inputElement).toBeInTheDocument(); // Verifica se o input está no documento
    expect(buttonElement).toBeInTheDocument(); // Verifica se o botão está no documento
});

test('calls onSearch with the input value when submitted', () => {
    const mockOnSearch = jest.fn(); // Cria uma função mock
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const inputElement = screen.getByPlaceholderText(/digite a cidade/i);
    const buttonElement = screen.getByRole('button');
    
    fireEvent.change(inputElement, { target: { value: 'São Paulo' } }); // Simula a digitação
    fireEvent.click(buttonElement); // Simula o clique no botão

    expect(mockOnSearch).toHaveBeenCalledWith('São Paulo'); // Verifica se a função foi chamada com o valor correto
});

test('shows alert when input is empty', () => {
    render(<SearchBox onSearch={() => {}} />);
    
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement); // Simula o clique no botão

    expect(global.alert).toHaveBeenCalledWith('Por favor, digite uma cidade.'); // Verifica se o alerta foi chamado
});

test('does not call onSearch when input is empty', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement); // Simula o clique no botão

    expect(mockOnSearch).not.toHaveBeenCalled(); // Verifica se a função não foi chamada
});