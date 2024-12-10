import React, { useState } from "react";
import PropTypes from 'prop-types';
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl/maplibre";
import Pin from "./pin";

async function fetchAddress(longitude, latitude) {
  const response = await fetch(
    `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=${import.meta.env.VITE_MAPTILER_KEY}`
  );
  const data = await response.json();
  return data.features[0]?.place_name || "Unknown location";
}

function MapPost({ onLocationSelect }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = async (event) => {
    const { lngLat } = event;
    const coords = { longitude: lngLat.lng, latitude: lngLat.lat };
    const address = await fetchAddress(lngLat.lng, lngLat.lat);
    setSelectedLocation(coords);
    onLocationSelect(coords, address);
    console.log("Selected location:", coords, address);
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
