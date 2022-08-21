import React, { useState, useCallback, useRef } from "react";

import redAreaArr from "../../services/data/redArea";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import {
  libraries,
  mapContainerStyle,
  options,
  center,
} from "../../services/mapsConfig/mapConfig";
import InfoWindowDetails from "../InfoWindowDetails/InfoWindowDetails";
import "./redMap.css";

export default function Map({ ApiKey }) {
  const [markers, setMarkers] = useState(redAreaArr);
  const [selected, setSelected] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: ApiKey,
    libraries,
  });

  const onMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    //console.log(lat, lng);
  };
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const unSelect = ()=>setSelected(false);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="locationsMap">
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12.5}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={onMapClick}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.place_id + "" + Math.random()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: `./location.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
          <InfoWindowDetails selected={selected} unSelect={unSelect} />
        ) : null}
      </GoogleMap>
    </div>
  );
}
