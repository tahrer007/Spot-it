import React from "react";

import Map from "../../components/redAreaMap/RedMap";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import useApiKey from "../../hooks/useApiKey";
import redAreaText from "../../services/data/redAreaText";
import "./redNeighborhoods.css";
const RedNeighborhoods = () => {
  const [loadingMap] = useApiKey();
  return (
    <div className="pagesContainer home BackGround">
      <div className="homePageLeft">
        {loadingMap.ApiKey && <Map ApiKey={loadingMap.ApiKey} />}
        {loadingMap.loading && <Loading />}
        {loadingMap.error && <Error />}
      </div>

      <div className="homePageRight">
        <div className="homeText">
          <h3>{redAreaText.p1}</h3>
          <div className="extrainfo">
            {redAreaText.p2}
            <a href="https://www.haifa.muni.il/operation/boars/"> Website </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RedNeighborhoods;
