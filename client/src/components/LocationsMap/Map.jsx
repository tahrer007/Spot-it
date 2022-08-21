import React, { useState, useCallback, useRef, useEffect } from "react";
import Search from "./search/Search";
import Locate from "./currentLocation/CurrentLocation";
import isInsideHaifa from "../../services/validateLocation/insideHaifa";
import HaifaCoords from "../../services/validateLocation/haifaCoords";
import InfoWindowDetails from "../InfoWindowDetails/InfoWindowDetails";
import { getAllLocations } from "../../services/locations";
import { myUrl } from "../../services/api";
import {
  libraries,
  mapContainerStyle,
  options,
  center,
} from "../../services/mapsConfig/mapConfig";
import "./map.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import { io } from "socket.io-client";

export default function Map({ handelMapClick, removeLocaLMark, ApiKey }) {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [localMark, setLocalMark] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: ApiKey,
    libraries,
  });

  useEffect(() => {
    async function getLocations() {
      const dbLocations = await getAllLocations();
      dbLocations?.success
        ? setMarkers(dbLocations.locations)
        : setMarkers(null);
    }
    getLocations();
  }, []);

  useEffect(() => {
    const socket = io(`${myUrl}socket`);
    socket.on("newLocation", (newLocation) => {
      setMarkers((prevState) => [...prevState, newLocation]);
    });
  }, []);

  useEffect(() => {
    if (removeLocaLMark) setLocalMark(null);
  }, [removeLocaLMark]);

  const onMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    if (isInsideHaifa({ lat, lng })) {
      const newLocation = {
        lat,
        lng,
        time: new Date(),
      };
      setLocalMark(newLocation);
      handelMapClick(newLocation);
    } else {
      //error message - outside the polygen!!
    }
  };
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  if (loadError) {
    return "Error";
  }
  if (!isLoaded) {
    return "Loading...";
  }

  const unSelect = ()=>setSelected(false);

  return (
    <div className="locationsMap">
      <Locate panTo={panTo} />

      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12.5}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={onMapClick}
      >
        <Polygon
          onClick={onMapClick}
          paths={HaifaCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35}
        />
        {localMark && !removeLocaLMark && (
          <Marker
            position={{
              lat: localMark.lat,
              lng: localMark.lng,
            }}
            onClick={() => {
              setSelected(localMark);
            }}
            icon={{
              url: `./local.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        )}

        {markers &&
          markers.map((marker) => (
            <Marker
              key={marker._id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
              icon={{
                url: `./pumbaa.png`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              
            />
          ))}

        {selected && <InfoWindowDetails selected={selected} unSelect={unSelect}/>}
      </GoogleMap>
    </div>
  );
}
