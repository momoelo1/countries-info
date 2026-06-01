import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);
  return { type, value, onChange };
};

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,capital,languages,flags,population")
      .then((res) => setCountries(res.data))
      .catch(() => {});
  }, []);
  return countries;
};

export const useWeather = (capital) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    if (!capital) return;
    setWeather(null);
    axios
      .get(`https://wttr.in/${encodeURIComponent(capital)}?format=j1`)
      .then((res) => {
        const c = res.data.current_condition[0];
        setWeather({
          temp: c.temp_C,
          description: c.weatherDesc[0].value,
          wind: c.windspeedKmph,
        });
      })
      .catch(() => {});
  }, [capital]);
  return weather;
};
