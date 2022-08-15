import React, { useState, useEffect } from "react";
import { getGoogleApiKey } from "../services/locations";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [connectionStatus, setConnectionStatus] = useState({
    loading: true,
    ApiKey: null,
    error: null,
  });

  useEffect(() => {
    const getApiKey = async () => {
      const key = await getGoogleApiKey();
      setConnectionStatus({
        loading: false,
        ApiKey: key,
        error: null,
      });

      key
        ? setConnectionStatus({
            loading: false,
            ApiKey: key,
            error: null,
          })
        : setConnectionStatus({
            loading: false,
            ApiKey: false,
            error: true,
          });
    };

    getApiKey();
  }, []);

  return [connectionStatus];
};
