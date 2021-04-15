import React, { useState } from 'react';
import './App.css';

const api = {
  key: "be0929dad8d7f325d9bbf15d59159636",
  base: "https://api.openweathermap.org/data/2.5/"
}

const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(result);
        });
    }
  }

  return (
    <div className="App">
      <main>

        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        <div>
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              </div>

              <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}F</div>
              <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : ('')}
        </div>


      </main>
    </div>
  );
}

export default App;
