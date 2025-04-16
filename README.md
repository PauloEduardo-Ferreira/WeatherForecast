# Consulta de Previsão do Tempo

Este projeto é uma aplicação React que permite aos usuários consultar a previsão do tempo para diferentes cidades. A aplicação utiliza a API da HGbrasil para obter dados meteorológicos e exibe um mapa interativo com a localização da cidade pesquisada.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **OpenLayers**: Biblioteca para visualização de mapas.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **Jest**: Framework de testes para JavaScript.
- **CSS**: Para estilização da aplicação.

## Funcionalidades

- Pesquisa de cidades para obter a previsão do tempo.
- Exibição de informações meteorológicas, incluindo temperatura atual, previsão para os próximos dias e fase da lua.
- Mapa interativo que mostra a localização da cidade pesquisada.

## Instalação

Para instalar e executar o projeto, siga os passos abaixo:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/PauloEduardo-Ferreira/WeatherForecast
   cd weatherforecast

2. **Instale as dependências**

    ```bash
    npm install

3. **Inicie a aplicação**

    ```bash
    npm start

4. **Abra o navegador**

    Acesse http://localhost:3000 para ver a aplicação em funcionamento.

## Uso

1. Digite o nome de uma cidade no campo de busca e pressione o botão de busca.

2. As informações meteorológicas para a cidade serão exibidas, juntamente com um mapa mostrando a localização.

3. Você pode selecionar cidades previamente pesquisadas a partir do dropdown.

## Testes 

Para executar os testes unitários, utilize o seguinte comando:

    ```bash
    npm test

Os testes são escritos utilizando o Jest e cobrem as principais funcionalidades da aplicação.
