import axios from "axios";

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${
  import.meta.env.VITE_WEATHER_KEY
}&units=metric&q=`;

const getWeather = (city) => {
  const request = axios.get(`${baseUrl}${city}`);
  return request.then((response) => response.data);
};
export default {
  getWeather,
};
