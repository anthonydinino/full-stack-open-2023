import countriesService from "../services/country";
import weatherService from "../services/weather";
import { useState, useEffect } from "react";

const Weather = ({ city, countryData }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    weatherService.getWeather(city).then((data) => {
      setWeatherData(data);
    });
  }, [countryData]);

  return (
    weatherData && (
      <div className="weather">
        <h2>Weather in {countryData.capital}</h2>
        <p>temperature {weatherData.main.temp} Celcius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
        ></img>
        <p>wind {weatherData.wind.speed} m/s</p>
      </div>
    )
  );
};
const SpecificCountry = ({ name }) => {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    countriesService.getCountryByName(name).then((countryData) => {
      setCountryData(countryData);
    });
  }, []);

  const displayCountry = () => {
    if (!countryData) {
      return <p>loading...</p>;
    }
    if (countryData.name.common === name) {
      return (
        <>
          <p>capital {countryData.capital}</p>
          <p>area {countryData.area}</p>
          <h4>languages:</h4>
          <ul>
            {Object.values(countryData.languages).map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
          <img src={countryData.flags.png} alt={countryData.flags.alt}></img>
        </>
      );
    }
    return <p>something went wrong</p>;
  };

  return (
    <div>
      <h1>{name}</h1>
      {displayCountry()}
      {countryData && (
        <Weather city={countryData.capital} countryData={countryData} />
      )}
    </div>
  );
};

export default SpecificCountry;
