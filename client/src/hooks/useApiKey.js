import React, { useState, useEffect } from "react";
import { getGoogleApiKey } from "../services/locations";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [loadingMap, setLoadingMap] = useState({
    loading: true,
    ApiKey: null,
    error: null,
  });

  useEffect(() => {

    console.log("sfsdfasfhadskj asdfhjhwernj iosdf da")
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

    getApiKey();
  }, []);

  return [loadingMap];
};
