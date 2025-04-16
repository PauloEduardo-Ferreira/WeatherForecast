import React from 'react';
import './WeatherInfo.css';

// Importando as imagens da lua
import newMoon from '../../assets/imgs_moon/new.png';
import waxingCrescent from '../../assets/imgs_moon/waxing_crescent.png';
import firstQuarter from '../../assets/imgs_moon/first_quarter.png';
import waxingGibbous from '../../assets/imgs_moon/waxing_gibbous.png';
import fullMoon from '../../assets/imgs_moon/full_moon.png';
import waningGibbous from '../../assets/imgs_moon/waning_gibbous.png';
import lastQuarter from '../../assets/imgs_moon/last_quarter.png';
import waningCrescent from '../../assets/imgs_moon/waning_crescent.png';

// Importando as imagens do clima
import clearDay from '../../assets/imgs/clear_day.svg';
import clearNight from '../../assets/imgs/clear_night.svg';
import cloud from '../../assets/imgs/cloud.svg';
import cloudlyDay from '../../assets/imgs/cloudly_day.svg';
import cloudlyNight from '../../assets/imgs/cloudly_night.svg';
import fog from '../../assets/imgs/fog.svg';
import hail from '../../assets/imgs/hail.svg';
import noneDay from '../../assets/imgs/none_day.svg';
import noneNight from '../../assets/imgs/none_night.svg';
import rain from '../../assets/imgs/rain.svg';
import snow from '../../assets/imgs/snow.svg';
import storm from '../../assets/imgs/storm.svg';

// Mapeamento das fases da lua para as imagens locais
const moonPhaseImages = {
    "new_moon": newMoon,
    "waxing_crescent": waxingCrescent,
    "first_quarter": firstQuarter,
    "waxing_gibbous": waxingGibbous,
    "full": fullMoon,
    "waning_gibbous": waningGibbous,
    "last_quarter": lastQuarter,
    "waning_crescent": waningCrescent,
};

// Mapeamento das condições climáticas para as imagens
const weatherImages = {
    "Tempo limpo": clearDay,
    "Tempo limpo noite": clearNight,
    "Tempo nublado": cloud,
    "Parcialmente nublado": cloudlyDay,
    "Parcialmente nublado noite": cloudlyNight,
    "Névoa": fog,
    "Granizo": hail,
    "none_day": noneDay,
    "none_night": noneNight,
    "Chuva": rain,
    "Chuvas esparsas": rain,
    "Neve": snow,
    "Tempestade": storm,
};

const WeatherInfo = ({ weatherData }) => {
    // Retorna null se não houver dados de clima
    if (!weatherData) return null;

    // Desestruturação dos dados de clima
    const { city, current, forecast, moonPhase } = weatherData;

    // Função para converter a data se necessário
    const parseDate = (dateString) => {
        const currentYear = new Date().getFullYear(); // Obtém o ano atual
        const [day, month] = dateString.split('/'); // Divide a data em dia e mês
        const date = new Date(`${currentYear}-${month}-${day}`);
        return isNaN(date) ? null : date; // Retorna null se a data for inválida
    };

    // Função para obter a hora atual
    const getCurrentHour = () => {
        return new Date().getHours(); // Retorna a hora atual (0-23)
    };

    // Função para determinar o ícone do clima com base na hora
    // Função para determinar o ícone do clima com base na hora
    const getWeatherIcon = (description) => {
        const hour = getCurrentHour();
        const isDayTime = hour >= 5 && hour < 18; // Considera dia entre 5h e 18h

        // Lógica para escolher o ícone com base na descrição e no horário
        if (description.includes("noite") || !isDayTime) {
            // Se for noite ou não for dia, use o ícone noturno
            return weatherImages[`${description}_night`] || weatherImages[description] || null;
        } else {
            // Caso contrário, use o ícone diurno
            return weatherImages[description] || null;
        }
    };
    
        // Obtém a imagem do clima atual
        const weatherImageSrc = getWeatherIcon(current?.description);
    
        return (
            <div className="weather-info">
                <h2>{city}</h2> {/* Exibe o nome da cidade */}
                <p>{new Date().toLocaleDateString()}</p> {/* Exibe a data atual */}
                <p>Atual: {current?.temp}° </p> {/* Exibe a temperatura atual */}
                <p>Máx.: {forecast?.[0]?.max}° / Mín.: {forecast?.[0]?.min}° </p> {/* Exibe a temperatura máxima e mínima */}
                <p>Clima: {current?.description}</p> {/* Exibe a descrição do clima */}
                {weatherImageSrc && (
                    <img
                        src={weatherImageSrc} // Imagem do clima atual
                        alt={`Clima: ${current?.description}`} // Texto alternativo para a imagem
                        className="weather-icon" // Classe CSS para estilização
                    />
                )}
                <p>Probabilidade de Chuva: {current?.rainProbability}%</p> {/* Exibe a probabilidade de chuva */}
                <p>Fase da Lua:
                    {moonPhase && (
                        <span className="moon-phase">
                            <img
                                src={moonPhaseImages[moonPhase]} // Imagem da fase da lua
                                alt={`Fase da Lua: ${moonPhase}`} // Texto alternativo para a imagem
                                className="moon-phase" // Classe CSS para estilização
                            />
                        </span>
                    )}
                </p>
    
                <h3 className="forecast-info">Próximos 3 dias</h3> {/* Título para a previsão do tempo */}
                <ul className="forecast-info">
                    {forecast?.slice(2, 5).map((day, index) => { // Mapeia os próximos 3 dias
                        const date = parseDate(day.date); // Converte a data
                        const weatherImageSrc = getWeatherIcon(day.description); // Obtém a imagem correspondente
    
                        return (
                            <li key={index}>
                                <strong>{date ? date.toLocaleDateString() : 'Data inválida'}</strong>: {/* Exibe a data */}
                                ↑ {day.max}° / ↓ {day.min}°<br /> {/* Exibe a temperatura máxima e mínima */}
                                Clima: {day.description}<br /> {/* Exibe a descrição do clima */}
                                {weatherImageSrc && (
                                    <img
                                        src={weatherImageSrc} // Imagem do clima do dia
                                        alt={`Clima: ${day.description}`} // Texto alternativo para a imagem
                                        className="weather-icon-day" // Classe CSS para estilização
                                    />
                                )}
                                <br />
                                Chance de Chuva: {day.rain_probability ? day.rain_probability : '0'}% {/* Exibe a chance de chuva */}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };
    
    export default WeatherInfo;