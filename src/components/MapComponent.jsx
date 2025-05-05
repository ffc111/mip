import React, { useState, useEffect } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaMapMarkerAlt, FaHospital, FaAmbulance } from "react-icons/fa";

const MapComponent = ({ currentLocation, hospitalLocation, ambulanceLocation, showRoute }) => {
  // Centered view between both locations
  const [viewState, setViewState] = useState({
    latitude: 38.690,
    longitude: -9.315,
    zoom: 13,
  });

  // GeoJSON for the route line
  const [routeLine, setRouteLine] = useState(null);

  useEffect(() => {
    if (currentLocation && hospitalLocation) {
      setRouteLine({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [hospitalLocation.longitude, hospitalLocation.latitude],
            [currentLocation.longitude, currentLocation.latitude]
          ]
        }
      });
    }
  }, [currentLocation, hospitalLocation]);

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken="pk.eyJ1IjoiZmZjMTExIiwiYSI6ImNtOWE2c292NzAyNjkybHNjbW5mamJvYmMifQ._LmjqsJmZg1m4KWaDDCxbw"
    >
      {/* Route line */}
      {showRoute && routeLine && (
        <Source id="route" type="geojson" data={routeLine}>
          <Layer
            id="route-line"
            type="line"
            paint={{
              'line-color': '#6c5ce7',
              'line-width': 4,
              'line-opacity': 0.8,
              'line-dasharray': [0.5, 1.5]
            }}
          />
          <Layer
            id="route-glow"
            type="line"
            paint={{
              'line-color': '#6c5ce7',
              'line-width': 12,
              'line-opacity': 0.15,
              'line-blur': 3
            }}
            beforeId="route-line"
          />
        </Source>
      )}

      {/* Current Location Marker */}
      {currentLocation && (
        <Marker 
          longitude={currentLocation.longitude} 
          latitude={currentLocation.latitude}
          offset={[0, -20]}
        >
          <div className="map-marker current" title={currentLocation.name}>
            <FaMapMarkerAlt />
          </div>
        </Marker>
      )}

      {/* Hospital Marker */}
      {hospitalLocation && (
        <Marker 
          longitude={hospitalLocation.longitude} 
          latitude={hospitalLocation.latitude}
          offset={[0, -20]}
        >
          <div className="map-marker hospital" title={hospitalLocation.name}>
            <FaHospital />
          </div>
        </Marker>
      )}

      {/* Ambulance Marker */}
      {ambulanceLocation && (
        <Marker 
          longitude={ambulanceLocation.longitude} 
          latitude={ambulanceLocation.latitude}
          offset={[0, -20]}
        >
          <div className="map-marker ambulance" title="Your transport">
            <FaAmbulance />
          </div>
        </Marker>
      )}
    </Map>
  );
};

export default MapComponent;