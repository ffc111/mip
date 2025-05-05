import React, { useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = () => {
  // Centered view between both locations
  const [viewState, setViewState] = useState({
    latitude: 38.690,
    longitude: -9.315,
    zoom: 13,
  });

  // Verified coordinates
  const novaSchoolCoords = { latitude: 38.679620, longitude: -9.326610 }; // Nova SBE
  const hospitalCoords = { latitude: 38.701596, longitude: -9.305014 };    // Hospital da Luz

  // GeoJSON for the dotted line
  const routeLine = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [hospitalCoords.longitude, hospitalCoords.latitude],
        [novaSchoolCoords.longitude, novaSchoolCoords.latitude]
      ]
    }
  };

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100%', height: '400px' }} // Adjust height as needed
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1IjoiZmZjMTExIiwiYSI6ImNtOWE2c292NzAyNjkybHNjbW5mamJvYmMifQ._LmjqsJmZg1m4KWaDDCxbw"
    >
      {/* Black dotted line */}
      <Source id="route" type="geojson" data={routeLine}>
        <Layer
          type="line"
          paint={{
            'line-color': '#000000',
            'line-width': 3,
            'line-dasharray': [2, 2] // Dotted pattern
          }}
        />
      </Source>

      {/* Nova SBE Marker */}
      <Marker {...novaSchoolCoords}>
        <div style={{ fontSize: '24px', transform: 'translate(-50%, -100%)' }} title="Nova SBE">
          📍
        </div>
      </Marker>

      {/* Hospital Marker */}
      <Marker {...hospitalCoords}>
        <div style={{ fontSize: '24px', transform: 'translate(-50%, -100%)' }} title="Hospital da Luz">
          🚑
        </div>
      </Marker>
    </Map>
  );
};

export default MapComponent;