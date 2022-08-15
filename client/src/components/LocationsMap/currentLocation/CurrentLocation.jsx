import React from "react";
import "./currentLocation.css";

export default function Locate({ panTo }) {
  const getCurrentLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (pos) => {
      const crd = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      panTo(crd);
    };

    function error(err) {
      alert(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return <div className="locate" onClick={() => getCurrentLocation()}></div>;
}
