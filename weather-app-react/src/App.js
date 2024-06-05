// import logo from './logo.svg';
import React, { useState } from "react";
import "./index.css";

const api = {
  key: "21578b9587f98e2bc024b5255d001988",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  const search = async (evt) => {
    if (evt.key === "Enter") {
      const response = await fetch(
        `${api.base}weather?&units=metric&q=${query}&appid=${api.key}`
      );
      const result = await response.json();
      setWeather(result);
      setQuery("");
      console.log(weather);
    }
  };

  //   if (evt.key === "Enter") {
  //     fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
  //       .then((res) => {
  //         res.json();
  //       })
  //       .then((result) => {
  //         setWeather(result);
  //         setQuery("");
  //         console.log(result);
  //       })
  //       .catch((e) => {
  //         //handle the error
  //         console.log("error message" + e);
  //       });
  //   }
  // };

  // Request a weekday along with a long date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 30
            ? "hot"
            : weather.main.temp < 16
            ? "cold"
            : "warm"
          : "app"
      }
    >
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='searching...'
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
            onKeyDown={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name},{weather.sys.country}
              </div>
              <div className='date'>
                {new Date().toLocaleString("en-US", options)}
              </div>
            </div>
            <div className='weather-box'>
              <div className='temperature'>
                {Math.round(weather.main.temp)}°c
              </div>
              <div className='weather'>{weather.weather[0]["description"]}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
