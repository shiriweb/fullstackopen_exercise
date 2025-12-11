import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
      )
      .then((res) => setWeather(res.data))
      .catch((err) => console.log(err));
  }, [capital, api_key]);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div style={{ marginTop: "10px" }}>
      <h4>Weather in {capital}</h4>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Wind: {weather.wind.speed} m/s</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
    </div>
  );
};

export default Weather;
