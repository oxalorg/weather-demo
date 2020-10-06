import axios from "axios";

export default async (req, res) => {
  const {
    query: { params },
  } = req;

  if (params.length !== 2 || !params[0] || !params[1]) {
    res.statusCode = 400;
    res.end("Invalid parameteres. Need 2 floats for Latitude and Longitude.");
  }

  const [lat, lon] = params;
  const primitiveLatLonMatch = /^[-+]?\d+(\.\d+)?$/;
  if (!lat.match(primitiveLatLonMatch) || !lon.match(primitiveLatLonMatch)) {
    res.statusCode = 400;
    res.end("Invalid latitude and longitide values.");
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY;

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
  res.statusCode = 200;
  res.json(weather);
};
