import moment from "moment";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Landing from "../components/Landing.jsx";

export default function Home({ weather }) {
  return <Landing weather={weather} />;
}

export async function getServerSideProps(context) {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const lat = "19.069979699999998";
  const lon = "72.8397202";

  let res = await axios({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/onecall`,
    params: {
      lat: lat,
      lon: lon,
      exclude: "minutely,alerts",
      appid: API_KEY,
    },
  });
  let weather = res.data;
  return {
    props: {
      weather: res.data,
    },
  };
}
