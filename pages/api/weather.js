import axios from "axios";

export default async (req, res) => {
  res.statusCode = 200;
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const lat = "19.069979699999998";
  const lon = "72.8397202";

  let weatherRes = await axios({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/onecall`,
    params: {
      lat: lat,
      lon: lon,
      exclude: "minutely,alerts",
      appid: API_KEY,
    },
  });

  let weather = weatherRes.data;
  res.json(weather);
};
