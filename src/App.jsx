/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        alert(`something in ${error} went wrong`);
      });
  }, []);

  const searchFilter = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const ShowCountries = ({ filterCountries }) => {
    const [weather, setWeather] = useState("");

    if (filterCountries.length === 1) {
      const singleCountry = filterCountries[0];
      const languages = Object.values(singleCountry.languages);
      const capital = Object.values(singleCountry.capital);
      const convertToC = (k) => (k - 273.15).toFixed(2);
      const i = 0;

      useEffect(() => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=c20ea227927af5d2061cde74e60ed1a1`
          )
          .then((response) => {
            setWeather(response.data);
          })
          .catch((error) => {
            alert(`something in ${error} went wrong`);
          });
      }, [capital]);

      return (
        <div>
          <h1>{singleCountry.name.common}</h1>
          <p>capital: {singleCountry.capital}</p>
          <p>area: {singleCountry.area}</p>
          <p>population: {singleCountry.population}</p>
          <div>
            languages:
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </div>
          <br />
          <img src={singleCountry.flags.svg} alt="flag" width="150px" />
          <div>
            {weather ? (
              <div>
                <h3>weather in {capital}</h3>
                <p>temperature: {convertToC(weather.main.temp)} °C</p>
                <p>
                  weather description: <b>{weather.weather[i].description}</b>
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[i].icon}@2x.png`}
                  alt="condition-img"
                />
                <p>wind: {weather.wind.speed} m/s</p>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    if (filterCountries.length > 10) {
      return (
        <>
          <p>List too long!</p>
          <p>Search for a country in through the Filter input...</p>
        </>
      );
    }
    return filterCountries.map((country) => (
      <div key={country.name.common}>
        {country.name.common}
        <button
          value={country.name.common}
          onClick={(e) => setFilter(e.target.value)}
        >
          show
        </button>
      </div>
    ));
  };

  return (
    <div>
      <Filter value={filter} handleFilter={(e) => setFilter(e.target.value)} />
      <ShowCountries filterCountries={searchFilter} />
    </div>
  );
};

export default App;
