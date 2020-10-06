import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import useSWR from "swr";

import styles from "../styles/Home.module.css";
import Landing from "../components/Landing.jsx";
import LoadingSpinner from "../components/LoadingSpinner";

const usePosition = () => {
  const [position, setPosition] = useState({ lat: null, lon: null });
  const KEY = "user-position";

  useEffect(() => {
    let pos = JSON.parse(localStorage.getItem(KEY), {});
    if (!pos || !pos.lat || !pos.lon) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          pos = { lat: latitude, lon: longitude };
          localStorage.setItem(KEY, JSON.stringify(pos));
          setPosition(pos);
        },
        () => alert("Permission denied. Please refresh and try again.")
      );
    } else {
      setPosition(pos);
    }
  }, []);

  return position;
};

export default function Home() {
  const position = usePosition();
  const { data, error } = useSWR(
    () => `/api/weather/${position.lat}/${position.lon}`,
    (...args) => axios(...args).then((res) => res.data)
  );

  if (!position.lat) return <LoadingSpinner size={14} />;
  if (error) return <div>Sorry, failed to determing your location.</div>;
  if (!data) return <LoadingSpinner size={14} />;
  return <Landing weather={data} />;
}
