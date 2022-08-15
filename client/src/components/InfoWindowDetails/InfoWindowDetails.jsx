import React, { useRef, useEffect } from "react";
import { formatRelative } from "date-fns";

const InfoWindowDetails = ({ selected }) => {
  return (
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
  );
};

export default InfoWindowDetails;
