import React, { useRef, useEffect } from "react";
import { formatRelative } from "date-fns";
import { InfoWindow } from "@react-google-maps/api";

const InfoWindowDetails = ({ selected, unSelect }) => {
  return (
    <>
      <InfoWindow
        position={{ lat: selected.lat, lng: selected.lng }}
        onCloseClick={() => {
          unSelect();
        }}
      >
        {selected?.number ? (
          <div className="InfoWindow">
            <h2>
              <span role="img" aria-label="wild pig">
                🐗
              </span>
              Alert
            </h2>
            <p>
              Spotted {formatRelative(Date.parse(selected.time), new Date())}
              <br />
              number : {selected.number} <br />
              {selected.comment ? "comment : " + selected.comment : null}
            </p>
          </div>
        ) : (
          <div className="InfoWindow">
            <h2>
              <span role="img" aria-label="wild pig">
                🏘️
              </span>
              {selected.name}
            </h2>
          </div>
        )}
      </InfoWindow>
    </>
  );
};

export default InfoWindowDetails;
