// import React, { useState } from "react";
// import "./Weather.css";
// import { FaSearch, FaWind } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";
// import { WiHumidity } from "react-icons/wi";

// const Weather = () => {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const API_KEY = "5acc1683650652bab831ecf7d57fd397";

//   const handleOnChange = (event) => {
//     setCity(event.target.value);
//   };

//   const fetchData = async () => {
//     if (!city) {
//       setError("Please enter a city name.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setWeather(null);

//     try {
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
//       const response = await fetch(url);
//       const data = await response.json();

//       if (response.ok) {
//         setWeather(data);
//         setError("");
//       } else {
//         setError("No data found. Please enter a valid city name.");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       {/* Search Bar */}
//       <div className="city">
//         <input
//           type="text"
//           value={city}
//           onChange={handleOnChange}
//           placeholder="Enter any city name"
//         />
//         <button onClick={fetchData}>
//           <FaSearch />
//         </button>
//       </div>

//       {/* Loading State */}
//       {loading && <p className="loading">Loading...</p>}

//       {/* Error Message */}
//       {error && <p className="error-message">{error}</p>}

//       {/* Weather Info */}
//       {weather && weather.weather && (
//         <div className="content">
//           {/* Weather Image + Description */}
//           <div className="weather-image">
//             <img
//               src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//               alt="Weather Icon"
//             />
//             <h3 className="desc">{weather.weather[0].description}</h3>
//           </div>

//           {/* Temperature */}
//           <div className="weather-temp">
//             <h2>
//               {weather.main.temp}
//               <span>°C</span>
//             </h2>
//           </div>

//           {/* Location */}
//           <div className="weather-city">
//             <div className="location">
//               <MdLocationOn />
//             </div>
//             <p>
//               {weather.name}, <span>{weather.sys.country}</span>
//             </p>
//           </div>

//           {/* Extra Stats */}
//           <div className="weather-stats">
//             {/* Wind */}
//             <div className="wind">
//               <div className="wind-icon">
//                 <FaWind />
//               </div>
//               <h3 className="wind-speed">
//                 {weather.wind.speed} <span>Km/h</span>
//               </h3>
//               <h3 className="wind-heading">Wind Speed</h3>
//             </div>

//             {/* Humidity */}
//             <div className="humidity">
//               <div className="humidity-icon">
//                 <WiHumidity />
//               </div>
//               <h3 className="humidity-percent">
//                 {weather.main.humidity}
//                 <span>%</span>
//               </h3>
//               <h3 className="humidity-heading">Humidity</h3>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Weather;


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

  const API_KEY = "5acc1683650652bab831ecf7d57fd397";

  const handleOnChange = (event) => {
    setCity(event.target.value);
    setError("");
  };

  const fetchData = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.cod === 200) {
        setWeather(data);
      } else {
        setError(data.message || "No data found. Please enter a valid city.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Search Bar */}
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={handleOnChange}
          onKeyDown={(e) => e.key === "Enter" && fetchData()}
          placeholder="Enter any city name"
        />
        <button onClick={fetchData}>
          <FaSearch />
        </button>
      </div>

      {/* Loading State */}
      {loading && <div className="loading-spinner"></div>}

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Weather Info */}
      {weather && weather.weather && (
        <div className="content">
          {/* Weather Image + Description */}
          <div className="weather-image">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
            <h3 className="desc">{weather.weather[0].description}</h3>
          </div>

          {/* Temperature */}
          <div className="weather-temp">
            <h2>
              {weather.main.temp}
              <span>°C</span>
            </h2>
          </div>

          {/* Location */}
          <div className="weather-city">
            <div className="location">
              <MdLocationOn />
            </div>
            <p>
              {weather.name}, <span>{weather.sys.country}</span>
            </p>
          </div>

          {/* Extra Stats */}
          <div className="weather-stats">
            {/* Wind */}
            <div className="wind">
              <div className="wind-icon">
                <FaWind />
              </div>
              <h3 className="wind-speed">
                {weather.wind.speed} <span>Km/h</span>
              </h3>
              <h3 className="wind-heading">Wind Speed</h3>
            </div>

            {/* Humidity */}
            <div className="humidity">
              <div className="humidity-icon">
                <WiHumidity />
              </div>
              <h3 className="humidity-percent">
                {weather.main.humidity}
                <span>%</span>
              </h3>
              <h3 className="humidity-heading">Humidity</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
