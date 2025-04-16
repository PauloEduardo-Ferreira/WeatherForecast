import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBox.css';

const SearchBox = ({ onSearch }) => {
    // Estado para armazenar o valor da cidade digitada pelo usuário
    const [city, setCity] = useState('');

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        
        // Verifica se o campo de cidade está vazio
        if (city.trim() === '') {
            alert('Por favor, digite uma cidade.'); // Alerta ao usuário
            return; // Interrompe a execução se a cidade estiver vazia
        }
        
        // Chama a função onSearch passada como prop com o valor da cidade
        onSearch(city);
        
        // Limpa o campo de entrada após a pesquisa
        setCity(''); 
    };

    return (
        <form onSubmit={handleSubmit} className="search-box">
            <input
                type="text" // Tipo de entrada de texto
                value={city} // Valor do input vinculado ao estado
                onChange={(e) => setCity(e.target.value)} // Atualiza o estado quando o usuário digita
                placeholder="Digite a cidade" // Texto de espaço reservado
            />
            <button type="submit" className="search-button">
                {/* Ícone de busca usando FontAwesome */}
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </button>
        </form>
    );
};

export default SearchBox;