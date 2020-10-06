import axios from "axios";

export default async (req, res) => {
  const {
    query: { params },
  } = req;
  console.log(params);

  res.statusCode = 200;
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const lat = params[0];
  const lon = params[1];

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
