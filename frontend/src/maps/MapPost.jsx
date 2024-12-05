import React, { useState } from "react";
import PropTypes from 'prop-types';
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl/maplibre";
import Pin from "./pin";

function MapPost({ onLocationSelect }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (event) => {
    const { lngLat } = event;
    setSelectedLocation({ longitude: lngLat.lng, latitude: lngLat.lat });
    onLocationSelect({ longitude: lngLat.lng, latitude: lngLat.lat });
  };

  return (
    <Map
      initialViewState={{
        longitude: -88.227206,
        latitude: 40.108366,
        zoom: 12,
        minZoom: 9,
      }}
      mapStyle={`https://api.maptiler.com/maps/abe94a0c-8bd0-452a-9877-c81b511b9e7a/style.json?key=${
        import.meta.env.VITE_MAPTILER_KEY
      }`}
      onClick={handleMapClick}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      {selectedLocation && (
        <Marker
          longitude={selectedLocation.longitude}
          latitude={selectedLocation.latitude}
          anchor="bottom"
        >
          <Pin />
        </Marker>
      )}
    </Map>
  );
}
MapPost.propTypes = {
  onLocationSelect: PropTypes.func.isRequired,
};

export default MapPost;
