import React from "react";
import { steps, lastSentance } from "../../services/data/homeText";

export default function HomeText() {
  return (
    <div className="homeText">
      <h3> How its work ? </h3>
      <div className="list">
        <ol>
          {steps.map((y,i) => (
            <li key={i}>{y}</li>
          ))}
        </ol>
      </div>

      <h3> {lastSentance} </h3>
    </div>
  );
}
