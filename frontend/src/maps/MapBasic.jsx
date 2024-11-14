import React, { useMemo, useState } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl/maplibre";

import ControlPanel from "./control-panel";
import Pin from "./pin";
import CAMPUS from "./campus.json";

function MapBasic() {
  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      CAMPUS.map((location, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={location.longitude}
          latitude={location.latitude}
          price={location.price}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(location);
          }}
        >
          <Pin price={location.price} />
        </Marker>
      )),
    []
  );

  return (
    <>
      <Map
        initialViewState={{
          longitude: -88.227206, // Set your desired longitude
          latitude: 40.108366, // Set your desired latitude
          zoom: 13,
          minZoom: 9, // Adjust zoom level as needed
        }}
        // style={{ width: "100%", height: "100%" }} // Fullscreen style
        mapStyle={`https://api.maptiler.com/maps/abe94a0c-8bd0-452a-9877-c81b511b9e7a/style.json?key=${
          import.meta.env.VITE_MAPTILER_KEY
        }`}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |{" "}
              <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a>
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>
      {/* <ControlPanel /> */}
    </>
  );
}

export default MapBasic;
