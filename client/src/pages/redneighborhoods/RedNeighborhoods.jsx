import React, { useEffect, useState } from "react";
import "../../App.css";
import "./redNeighborhoods.css";
import "../home/home.css";
import Map from "../../components/redAreaMap/RedMap";
import { getGoogleApiKey } from "../../services/locations";

 const  RedNeighborhoods= () =>{

  const [ApiKey, setApiKey] = useState("");

  useEffect(() => {
    async function getApiKey() {
      const key = await getGoogleApiKey();
      setApiKey(key);
    }
    getApiKey();
  }, []);

  return (
    <div className="pagesContainer home BackGround">
      <div className="homePageLeft">
       { ApiKey && <Map ApiKey={ApiKey}/>}
      </div>

      <div className="homePageRight">
        <div className="homeText">
          <h3>
            These neighborhoods are the most affected by boars according to
            municipality of Haifa.
          </h3>
          <div className="extrainfo">
            If you have more questions about the boars or about the services
            that you can receive from the municipality of haifa you can visit
            their.
            <a href="https://www.haifa.muni.il/operation/boars/"> Website </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default  RedNeighborhoods ;