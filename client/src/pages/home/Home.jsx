import React, { useState, useEffect } from "react";
import Map from "../../components/LocationsMap/Map";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import NewLocationInput from "../../components/newLocationInput/NewLocationInput";
import HomeText from "../../components/homeText/HomeText";
import { postLocation } from "../../services/locations";
import useApiKey from "../../hooks/useApiKey";
function Home() {
  const [loadingMap] = useApiKey();
  const [newMark, setNewMark] = useState({
    lat: 0,
    lng: 0,
    time: null,
    comment: null,
    number: null,
  });
  const [addingLocation, setAddingLocation] = useState(false);
  const [removeLocaLMark, setRemoveLocalMark] = useState(false);
  useEffect(() => {
    const updateDb = async () => {
      await postLocation(newMark);
      setNewMark({});
    };

    if (!newMark.number) return;
    updateDb();
  }, [newMark]);

  const handelForm = (howMany, details) => {
    //if user cancel ..howMany=0 ; 
    if (howMany) {
      setNewMark((prevState) => ({
        ...prevState,
        number: howMany,
        comment: details,
      }));
    }
    setAddingLocation(false);
    setRemoveLocalMark(true);

    setTimeout(() => {
      setRemoveLocalMark(false);
    }, 1000);
  };

  const handelMapClick = (newLocationData) => {
    setAddingLocation(true);
    setNewMark((prevState) => ({
      ...prevState,
      lat: newLocationData.lat,
      lng: newLocationData.lng,
      time: newLocationData.time,
    }));
  };

  return (
    <div className="pagesContainer home BackGround ">
      <div className="homePageLeft">
        {loadingMap.loading && <Loading />}
        {loadingMap.error && <Error />}
        {loadingMap.ApiKey && (
          <Map
            handelMapClick={handelMapClick}
            removeLocaLMark={removeLocaLMark}
            ApiKey={loadingMap.ApiKey}
          />
        )}
      </div>

      <div className="homePageRight">
        {addingLocation ? (
          <NewLocationInput handelForm={handelForm} />
        ) : (
          <HomeText />
        )}
      </div>
    </div>
  );
}
export default Home;
