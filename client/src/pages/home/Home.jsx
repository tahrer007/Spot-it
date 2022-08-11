import React, { useState, useEffect } from "react";
import Map from "../../components/LocationsMap/Map";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import NewLocationInput from "../../components/newLocationInput/NewLocationInput";
import HomeText from "../../components/homeText/HomeText";
import { getGoogleApiKey, postLocation } from "../../services/locations";

function Home() {
  const [loadingMap, setLoadingMap] = useState({
    loading: true,
    ApiKey: null,
    error: null,
  });
  const [newMark, setNewMark] = useState({
    lat: 0,
    lng: 0,
    time: null,
    comment: null,
    number: null,
  });
  const [addingLocation, setAddingLocation] = useState(false);
  const [removeLocaLMark, setRemoveLocalMark] = useState(false);
  //get google api key and load the map
  useEffect(() => {
    const getApiKey = async () => {
      const key = await getGoogleApiKey();
      setLoadingMap({
        loading: false,
        ApiKey: key,
        error: null,
      });

      key
        ? setLoadingMap({
            loading: false,
            ApiKey: key,
            error: null,
          })
        : setLoadingMap({
            loading: false,
            ApiKey: false,
            error: true,
          });
    };
// set time out temprorey for devlopment 
    setTimeout(() => {
      getApiKey();
    }, 50000000);
  }, []);

  useEffect(() => {
    const updateDb = async () => {
      await postLocation(newMark);
      setNewMark({});
    };

    if (!newMark.number) return;
    updateDb();
  }, [newMark]);

  const handelForm = (howMany, details) => {
    if (!howMany) {
    } else {
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
