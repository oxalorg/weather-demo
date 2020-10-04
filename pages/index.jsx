import moment from "moment";
import axios from "axios";
import styles from "../styles/Home.module.css";

const UserLocation = ({ weather }) => {
  let time = moment.unix(weather.current.dt);
  console.log(time);
  return (
    <div>
      {weather.timezone} | {weather.timezone_offset}
      <p>{weather.current.dt}</p>
      <p>{time.fromNow()}</p>
      <ul>
        {weather.hourly.map((item) => {
          var hourTime = moment.unix(item.dt);
          return <li>{hourTime.fromNow()}</li>;
        })}
      </ul>
    </div>
  );
};

export default function Home({ name, weather }) {
  return (
    <div className="">
      Current temp is: {weather.current.temp}
      <UserLocation weather={weather} />
    </div>
  );
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
