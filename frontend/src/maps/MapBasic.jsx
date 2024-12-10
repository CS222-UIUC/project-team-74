import React, { useMemo, useState } from "react";
// import axios from "axios";
import PropTypes from 'prop-types';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl/maplibre";

// import ControlPanel from "./control-panel";
import Pin from "./pin";
// import CAMPUS from "./campus.json";

function MapBasic({ jobs }) {
  const [popupInfo, setPopupInfo] = useState(null);
  // const [jobs, setJobs] = useState([]); 

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/job-postings/jobs/")
  //     .then((response) => {
  //       setJobs(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the job postings!", error);
  //     });
  // }, []);

  const pins = useMemo(
    () =>
      jobs
        .filter(
          (job) =>
            job.coordinates &&
            !isNaN(job.coordinates.longitude) &&
            !isNaN(job.coordinates.latitude)
        )
        .map((job, index) => (
          <Marker
            key={`marker-${index}`}
            longitude={job.coordinates.longitude}
            latitude={job.coordinates.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(job);
            }}
          >
            <Pin price={job.price} />
          </Marker>
        )),
    [jobs]
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
            longitude={Number(popupInfo.coordinates.longitude)}
            latitude={Number(popupInfo.coordinates.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div className="text-black">
              {popupInfo.title} | {popupInfo.location}
            </div>
            <div className="text-black">
              Price: ${popupInfo.price}
            </div>
            <div className="text-black">
              Request by: {popupInfo.user.first_name ? popupInfo.user.first_name + " " + popupInfo.user.last_name : "N/A"}
            </div>
            <a
              className="text-blue-500"
              target="_new"
              href={popupInfo.user.email ? `mailto:${popupInfo.user.email}` : "javascript:void(0)"}
            >
              Contact Now
            </a>
          </Popup>
        )}
      </Map>
      {/* <ControlPanel /> */}
    </>
  );
}
MapBasic.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      coordinates: PropTypes.shape({
        longitude: PropTypes.number,
        latitude: PropTypes.number,
      }),
      price: PropTypes.number,
      title: PropTypes.string,
      location: PropTypes.string,
      user: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        email: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default MapBasic;
export { MapBasic };
