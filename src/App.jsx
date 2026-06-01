import { useState } from "react";
import { useField, useCountries, useWeather } from "./hooks";
import "./App.css";

const Weather = ({ capital }) => {
  const weather = useWeather(capital);
  if (!weather) return <p className="weather-loading">Loading weather…</p>;
  return (
    <div className="weather">
      <h3>Weather in {capital}</h3>
      <p className="weather-row">🌡 {weather.temp}°C &mdash; {weather.description}</p>
      <p className="weather-row">💨 Wind: {weather.wind} km/h</p>
    </div>
  );
};

const CountryDetail = ({ country }) => {
  const capital = country.capital?.[0];
  const languages = Object.values(country.languages || {});

  return (
    <div className="country-card">
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        className="flag"
      />
      <div className="country-info">
        <h2>{country.name.common}</h2>
        <div className="info-row">
          <span className="label">Capital</span>
          <span>{capital}</span>
        </div>
        <div className="info-row">
          <span className="label">Population</span>
          <span>{country.population.toLocaleString()}</span>
        </div>
        <div className="info-row languages-row">
          <span className="label">Languages</span>
          <div className="tags">
            {languages.map((lang) => (
              <span key={lang} className="tag">{lang}</span>
            ))}
          </div>
        </div>
        {capital && <Weather capital={capital} />}
      </div>
    </div>
  );
};

const App = () => {
  const filter = useField("text");
  const countries = useCountries();
  const [selected, setSelected] = useState(null);

  const query = filter.value.trim().toLowerCase();
  const matches = query
    ? countries.filter((c) =>
        c.name.common.toLowerCase().includes(query)
      )
    : [];

  const handleChange = (e) => {
    filter.onChange(e);
    setSelected(null);
  };

  const display = selected ?? (matches.length === 1 ? matches[0] : null);

  return (
    <div className="app">
      <header className="hero">
        <h1>Country Search</h1>
        <p>Start typing a country name</p>
      </header>

      <input
        type={filter.type}
        value={filter.value}
        onChange={handleChange}
        placeholder="e.g. Finland, Japan, Brazil…"
        className="search-input"
      />

      {query && !display && (
        <div className="suggestions">
          {matches.length > 10 ? (
            <p className="hint">Too many matches — be more specific</p>
          ) : matches.length === 0 ? (
            <p className="hint">No countries found</p>
          ) : (
            <ul>
              {matches.map((c) => (
                <li key={c.name.common} className="suggestion-item">
                  <span>{c.name.common}</span>
                  <button className="show-btn" onClick={() => setSelected(c)}>
                    Show
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {display && <CountryDetail country={display} />}
    </div>
  );
};

export default App;
