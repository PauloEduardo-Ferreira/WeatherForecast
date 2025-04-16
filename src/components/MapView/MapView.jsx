import React, { useEffect, useRef } from 'react';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import './MapView.css';

const MapView = ({ coordinates }) => {
  // Referência para o elemento DOM onde o mapa será renderizado
  const mapElement = useRef();

  useEffect(() => {
    // Criação da camada de mapa base usando OpenStreetMap
    const osmLayer = new TileLayer({
      preload: Infinity, // Precarrega camadas para melhorar a performance
      source: new OSM(), // Fonte de dados do OpenStreetMap
    });

    // Atualiza as coordenadas do ponto, passando o novo valor de `coordinates`
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat(coordinates)), // Converte as coordenadas fornecidas para EPSG:3857
      name: 'Ponto de Interesse',
    });

    // Fonte de dados para a camada de vetores, contendo o recurso de ícone
    const vectorSource = new VectorSource({
      features: [iconFeature], // Adiciona o recurso à fonte
    });

    // Criação da camada de vetores que usará a fonte de vetores
    const vectorLayer = new VectorLayer({
      source: vectorSource, // Define a fonte da camada
    });

    // Criação do mapa com a camada base e a camada de vetores
    const map = new Map({
      target: mapElement.current, // Elemento DOM onde o mapa será renderizado
      layers: [osmLayer, vectorLayer], // Camadas a serem exibidas no mapa
      view: new View({
        center: fromLonLat(coordinates), // Centraliza o mapa nas coordenadas fornecidas
        zoom: 11, // Nível de zoom inicial
      }),
    });

    // Limpeza do mapa ao desmontar o componente
    return () => map.setTarget(null);
  }, [coordinates]); // Reexecuta o efeito quando as coordenadas mudam

  // Renderiza o contêiner do mapa
  return <div className="map-container" ref={mapElement} />;
};

export default MapView;
