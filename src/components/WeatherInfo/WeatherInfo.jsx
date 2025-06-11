import React from "react";
import "./WeatherInfo.css";

// Importando as imagens da lua
import newMoon from "../../assets/imgs_moon/new.png";
import waxingCrescent from "../../assets/imgs_moon/waxing_crescent.png";
import firstQuarter from "../../assets/imgs_moon/first_quarter.png";
import waxingGibbous from "../../assets/imgs_moon/waxing_gibbous.png";
import fullMoon from "../../assets/imgs_moon/full_moon.png";
import waningGibbous from "../../assets/imgs_moon/waning_gibbous.png";
import lastQuarter from "../../assets/imgs_moon/last_quarter.png";
import waningCrescent from "../../assets/imgs_moon/waning_crescent.png";

// Importando as imagens do clima
import clearDay from "../../assets/imgs/clear_day.svg";
import clearNight from "../../assets/imgs/clear_night.svg";
import cloud from "../../assets/imgs/cloud.svg";
import cloudlyDay from "../../assets/imgs/cloudly_day.svg";
import cloudlyNight from "../../assets/imgs/cloudly_night.svg";
import fog from "../../assets/imgs/fog.svg";
import hail from "../../assets/imgs/hail.svg";
import noneDay from "../../assets/imgs/none_day.svg";
import noneNight from "../../assets/imgs/none_night.svg";
import rain from "../../assets/imgs/rain.svg";
import snow from "../../assets/imgs/snow.svg";
import storm from "../../assets/imgs/storm.svg";

// Mapeamento das fases da lua para as imagens locais
const moonPhaseImages = {
  new: newMoon,
  waxing_crescent: waxingCrescent,
  first_quarter: firstQuarter,
  waxing_gibbous: waxingGibbous,
  full: fullMoon,
  waning_gibbous: waningGibbous,
  last_quarter: lastQuarter,
  waning_crescent: waningCrescent,
};

// Mapeamento das condições climáticas para as imagens
const weatherImages = {
  "Tempo limpo": clearDay,
  "Tempo limpo noite": clearNight,
  "Tempo nublado": cloud,
  "Parcialmente nublado": cloudlyDay,
  "Parcialmente nublado noite": cloudlyNight,
  Névoa: fog,
  Granizo: hail,
  none_day: noneDay,
  none_night: noneNight,
  Chuva: rain,
  "Chuvas esparsas": rain,
  Neve: snow,
  Tempestade: storm,
};

const WeatherInfo = ({ weatherData }) => {
  // Retorna null se não houver dados de clima
  if (!weatherData) return null;

  // Desestruturação dos dados de clima
  const { city, current, forecast, moonPhase } = weatherData;

  // Função para converter a data se necessário
  const parseDate = (dateString) => {
    const currentYear = new Date().getFullYear();
    const [day, month] = dateString.split("/");
    const date = new Date(`${currentYear}-${month}-${day}`);
    return isNaN(date) ? null : date;
  };

  // Função para obter a hora atual
  const getCurrentHour = () => {
    return new Date().getHours();
  };

  // Função para determinar o ícone do clima com base na hora
  const getWeatherIcon = (description) => {
    const hour = getCurrentHour();
    const isDayTime = hour >= 5 && hour < 18;

    if (description.includes("noite") || !isDayTime) {
      return (
        weatherImages[`${description}_night`] ||
        weatherImages[description] ||
        null
      );
    } else {
      return weatherImages[description] || null;
    }
  };

  const weatherImageSrc = getWeatherIcon(current?.description);

  return (
    <div className="weather-info">
      <h2>{city}</h2>
      <p>{new Date().toLocaleDateString()}</p>
      <p>Atual: {current?.temp}° </p>
      <p>
        Máx.: {forecast?.[0]?.max}° / Mín.: {forecast?.[0]?.min}°{" "}
      </p>
      <p>Clima: {current?.description}</p>
      {weatherImageSrc && (
        <img
          src={weatherImageSrc}
          alt={`Clima: ${current?.description}`}
          className="weather-icon"
        />
      )}
      <p>Probabilidade de Chuva: {current?.rainProbability}%</p>
      <p>
        Fase da Lua:
        {moonPhase && (
          <span className="moon-phase">
            <img
              src={moonPhaseImages[moonPhase]}
              alt={`Fase da Lua: ${moonPhase}`}
              className="moon-phase"
            />
          </span>
        )}
      </p>

      <h3 className="forecast-info">Próximos 3 dias</h3>
      <ul className="forecast-info">
        {forecast?.slice(2, 5).map((day, index) => {
          const date = parseDate(day.date);
          const weatherImageSrc = getWeatherIcon(day.description);

          return (
            <li key={index}>
              <strong>
                {date ? date.toLocaleDateString() : "Data inválida"}
              </strong>
              : ↑ {day.max}° / ↓ {day.min}°<br />
              Clima: {day.description}
              <br />
              {weatherImageSrc && (
                <img
                  src={weatherImageSrc}
                  alt={`Clima: ${day.description}`}
                  className="weather-icon-day"
                />
              )}
              <br />
              Chance de Chuva:{" "}
              {day.rain_probability ? day.rain_probability : "0"}%
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WeatherInfo;
