import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherInfo from '../WeatherInfo/WeatherInfo';

// Mock das imagens
jest.mock('../../assets/imgs_moon/new.png', () => 'newMoon.png');
jest.mock('../../assets/imgs_moon/waxing_crescent.png', () => 'waxingCrescent.png');
jest.mock('../../assets/imgs_moon/first_quarter.png', () => 'firstQuarter.png');
jest.mock('../../assets/imgs_moon/waxing_gibbous.png', () => 'waxingGibbous.png');
jest.mock('../../assets/imgs_moon/full_moon.png', () => 'fullMoon.png');
jest.mock('../../assets/imgs_moon/waning_gibbous.png', () => 'waningGibbous.png');
jest.mock('../../assets/imgs_moon/last_quarter.png', () => 'lastQuarter.png');
jest.mock('../../assets/imgs_moon/waning_crescent.png', () => 'waningCrescent.png');

jest.mock('../../assets/imgs/clear_day.svg', () => 'clearDay.svg');
jest.mock('../../assets/imgs/clear_night.svg', () => 'clearNight.svg');
jest.mock('../../assets/imgs/cloud.svg', () => 'cloud.svg');
jest.mock('../../assets/imgs/cloudly_day.svg', () => 'cloudlyDay.svg');
jest.mock('../../assets/imgs/cloudly_night.svg', () => 'cloudlyNight.svg');
jest.mock('../../assets/imgs/fog.svg', () => 'fog.svg');
jest.mock('../../assets/imgs/hail.svg', () => 'hail.svg');
jest.mock('../../assets/imgs/none_day.svg', () => 'noneDay.svg');
jest.mock('../../assets/imgs/none_night.svg', () => 'noneNight.svg');
jest.mock('../../assets/imgs/rain.svg', () => 'rain.svg');
jest.mock('../../assets/imgs/snow.svg', () => 'snow.svg');
jest.mock('../../assets/imgs/storm.svg', () => 'storm.svg');

describe('WeatherInfo', () => {
    const mockWeatherData = {
        city: 'São Paulo',
        current: {
            temp: 25,
            description: 'Tempo limpo',
            rainProbability: 10,
        },
        forecast: [
            { date: '15/04', max: 30, min: 20, description: 'Tempo limpo', rain_probability: 5 }, // Dia de hoje
            { date: '16/04', max: 28, min: 18, description: 'Parcialmente nublado', rain_probability: 10 }, // Amanhã
            { date: '17/04', max: 26, min: 16, description: 'Chuva', rain_probability: 20 }, // Dia seguinte
            { date: '18/04', max: 27, min: 17, description: 'Sol', rain_probability: 15 }, // Dia após o seguinte
            { date: '19/04', max: 29, min: 19, description: 'Nublado', rain_probability: 25 }, // Dia após o seguinte
        ],
        moonPhase: 'full',
    };

    it('renders weather information correctly', () => {
        render(<WeatherInfo weatherData={mockWeatherData} />);

        expect(screen.getByText(/São Paulo/i)).toBeInTheDocument(); // Verifica se a cidade está no documento
        expect(screen.getByText(/Atual: 25°/i)).toBeInTheDocument(); // Verifica a temperatura atual
        expect(screen.getByText(/Máx.: 30° \/ Mín.: 20°/i)).toBeInTheDocument(); // Verifica a temperatura máxima e mínima
        expect(screen.getByText(/Clima: Tempo limpo/i)).toBeInTheDocument(); // Verifica a descrição do clima
        expect(screen.getByText(/Probabilidade de Chuva: 10%/i)).toBeInTheDocument(); // Verifica a probabilidade de chuva
        expect(screen.getByAltText(/Clima: Tempo limpo/i)).toBeInTheDocument(); // Verifica a imagem do clima atual
        expect(screen.getByAltText(/Fase da Lua: full/i)).toBeInTheDocument(); // Verifica a imagem da fase da lua
    });

    it('renders null when no weather data is provided', () => {
        const { container } = render(<WeatherInfo weatherData={null} />);
        expect(container).toBeEmptyDOMElement(); // Verifica se o componente não renderiza nada
    });

    it('renders forecast information correctly', () => {
        render(<WeatherInfo weatherData={mockWeatherData} />);

        // Verifica se as informações da previsão do tempo estão sendo exibidas corretamente
        const forecastItems = screen.getAllByRole('listitem'); // Obtém todos os itens da lista de previsão
        expect(forecastItems).toHaveLength(3); // Verifica se existem 3 itens na previsão

        // Verifica o primeiro item da previsão (Amanhã)
        expect(forecastItems[0]).toHaveTextContent('16/04'); // Verifica a data do primeiro item
        expect(forecastItems[0]).toHaveTextContent('↑ 26° / ↓ 16°'); // Verifica a temperatura do primeiro item
        expect(forecastItems[0]).toHaveTextContent('Clima: Chuva'); // Verifica a descrição do clima do primeiro item
        expect(forecastItems[0]).toHaveTextContent('Chance de Chuva: 20%'); // Verifica a chance de chuva do primeiro item

        // Verifica o segundo item da previsão (Dia seguinte)
        expect(forecastItems[1]).toHaveTextContent('17/04'); // Verifica a data do segundo item
        expect(forecastItems[1]).toHaveTextContent('↑ 27° / ↓ 17°'); // Verifica a temperatura do segundo item
        expect(forecastItems[1]).toHaveTextContent('Clima: Sol'); // Verifica a descrição do clima do segundo item
        expect(forecastItems[1]).toHaveTextContent('Chance de Chuva: 15%'); // Verifica a chance de chuva do segundo item

        // Verifica o terceiro item da previsão (Dia após o seguinte)
        expect(forecastItems[2]).toHaveTextContent('18/04'); // Verifica a data do terceiro item
        expect(forecastItems[2]).toHaveTextContent('↑ 29° / ↓ 19°'); // Verifica a temperatura do terceiro item
        expect(forecastItems[2]).toHaveTextContent('Clima: Nublado'); // Verifica a descrição do clima do terceiro item
        expect(forecastItems[2]).toHaveTextContent('Chance de Chuva: 25%'); // Verifica a chance de chuva do terceiro item
    });
});