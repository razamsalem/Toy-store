import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
// import  API_KEY  from "../../.env";

const ToyJoyMarker = ({ text }) => (
  <div style={{ width: '70px', height: '70px', textAlign: 'center', background: '#EE9322', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
    {text}
  </div>
);

export function GoogleMap({ centerMap }) {

  const [markers, setMarkers] = useState([
    { id: 1, lat: 32.0853, lng: 34.7818, text: "ToyJoy Tel Aviv branch" },
    { id: 2, lat: 35.724158, lng: 139.720502, text: "ToyJoy Tokyo branch" },
    { id: 3, lat: 25.861681, lng: -80.191788, text: "ToyJoy Miami branch" },
    { id: 4, lat: 51.5072, lng: 0.1276, text: "ToyJoy London branch" },
    { id: 5, lat: 20.648775, lng: -87.083798, text: "ToyJoy Mexico branch" },
  ])

  const [center, setCenter] = useState({ lat: 32.0853, lng: 34.7818 })

  useEffect(() => {
    setCenter(centerMap)
  }, [centerMap]);

  const options = {
    minZoom: 12,
  }

  return (
    <div style={{ height: '40vh', width: '80%'}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY }}
        center={center}
        defaultZoom={9}
        options={options}
      >
        {markers.map((marker) => (
          <ToyJoyMarker
            key={marker.id}
            lat={marker.lat}
            lng={marker.lng}
            text={marker.text}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}