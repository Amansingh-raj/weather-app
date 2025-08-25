import React, { useState } from "react";
import "./Weather.css";
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5acc1683650652bab831ecf7d57fd397&units=metric`
      );
      const data = await res.json();
      console.log("API Response:", data); 

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError("City not found");
      }
    } catch (err) {
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <video autoPlay muted loop id="bg-video">
        <source src="/clouds.mp4" type="video/mp4" />
      </video>

      
      <div className="container">
        
        <div className="city">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>
            <FaSearch />
          </button>
        </div>

       
        {loading && <div className="loading-spinner"></div>}

       
        {error && <div className="error-message">{error}</div>}

        
        {weather && (
          <>
            <div className="weather-image">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather-icon"
              />
            </div>
            <div className="desc">{weather.weather[0].description}</div>
            <div className="weather-temp">
              <h2>
                {Math.round(weather.main.temp)}°<span>C</span>
              </h2>
            </div>
            <div className="weather-city">
              <MdLocationOn />
              {weather.name}, {weather.sys.country}
            </div>

           
            <div className="weather-stats">
              <div>
                <FaWind className="wind-icon" />
                <div className="wind-speed">
                  {Math.round(weather.wind.speed)} km/h
                </div>
              </div>
              <div>
                <WiHumidity className="humidity-icon" />
                <div className="humidity-percent">
                  {weather.main.humidity}%
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;

