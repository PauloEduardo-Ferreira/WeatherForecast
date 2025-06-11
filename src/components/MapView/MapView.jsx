import React, { useEffect, useRef } from "react";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import "./MapView.css";

const MapView = ({ coordinates }) => {
  const mapElement = useRef();

  useEffect(() => {
    if (!coordinates || coordinates.length !== 2) {
      console.error("Coordenadas inválidas:", coordinates);
      return;
    }

    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const iconFeature = new Feature({
      geometry: new Point(fromLonLat(coordinates)),
      name: "Ponto de Interesse",
    });

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      target: mapElement.current,
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: fromLonLat(coordinates),
        zoom: 11,
      }),
    });

    return () => map.setTarget(null);
  }, [coordinates]);

  return <div className="map-container" ref={mapElement} />;
};

export default MapView;
