import { useEffect } from "react";
import { useState } from "react";

import axios from "axios";
import Weather from "./Weather";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    const capital = country.capital?.[0];
    if (!capital) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
      )
      .then((response) => setWeather(response.data))
      .catch((error) => console.error("weather api error:", error));
  }, [country, api_key]);

  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>
        <strong>Capital:</strong> {country.capital[0]}
      </p>

      <p>
        <strong>Area:</strong> {country.area}
      </p>

      <h3>Languages:</h3>
      <ul>
        {country.languages ? (
          Object.values(country.languages).map((lang) => {
            return <li key={lang}>{lang}</li>;
          })
        ) : (
          <li>No languages listed</li>
        )}
      </ul>
      <img src={country.flags.png} alt="flag" width="150" />

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>

          <p>
            <strong>Temperature: </strong>
            {weather.main.temp}°C
          </p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icons"
          />

          <p>
            <strong>Wind:</strong> {weather.wind.speed} meter/second
          </p>
        </div>
      )}

      {country.capital && <Weather capital={country.capital[0]} />}
    </div>
  );
};

export default CountryDetails;
