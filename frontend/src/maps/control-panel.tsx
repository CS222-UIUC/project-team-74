import React from 'react';

function ControlPanel() {
  return (
    <div className="absolute top-20 right-4 p-4 bg-white bg-opacity-80 shadow-lg rounded-md z-10 w-80">
      <h3 className="text-lg font-semibold mb-2 text-black">Marker, Popup, NavigationControl and FullscreenControl</h3>
      <p className="mb-2 text-black">
        Map showing the top 20 most populated cities of the United States. Click on a marker to learn more.
      </p>

      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/7.1-release/examples/controls"
          target="_new"
          className="text-blue-600 underline"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
