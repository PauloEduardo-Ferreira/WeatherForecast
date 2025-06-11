import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBox.css";

const SearchBox = ({ onSearch }) => {
  // Estado para armazenar o valor da cidade digitada pelo usuário
  const [city, setCity] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    if (city.trim() === "") {
      alert("Por favor, digite uma cidade.");
      return;
    }

    onSearch(city);

    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Digite a cidade"
      />
      <button type="submit" className="search-button">
        {/* Ícone de busca usando FontAwesome */}
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </button>
    </form>
  );
};

export default SearchBox;
