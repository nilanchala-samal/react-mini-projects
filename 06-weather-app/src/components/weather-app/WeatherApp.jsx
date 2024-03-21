import React, { useEffect, useState } from 'react'
import './weather-app.css'
import axios from 'axios'

import search_icon from '../../assets/search.png'
import clear_icon from '../../assets/clear.png'
import cloud_icon from '../../assets/cloud.png'
import drizzle_icon from '../../assets/drizzle.png'
import humidity_icon from '../../assets/humidity.png'
import rain_icon from '../../assets/rain.png'
import snow_icon from '../../assets/snow.png'
import wind_icon from '../../assets/wind.png'

const WeatherApp = () => {

  const [city, setCity] = useState("") // for the current city
  const [humidity, setHumidity] = useState(0)
  const [wind, setWind] = useState(0)
  const [temperature, setTemperature] = useState(0);
  const [location, setLocation] = useState(null)
  const [wIcon, setWIcon] = useState(cloud_icon)
  const [weatherIconCode, setWeatherIconCode] = useState()

  // -----------------------------  function to get the current location ----------------------------------
  async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {
              const cityName = await getCityName(latitude, longitude);
              resolve(cityName);
            } catch (error) {
              reject(error);
            }
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported"));
      }
    });
  }

  async function getCityName(latitude, longitude) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      const cityName = data.address.city;
      return cityName;
    } catch (error) {
      console.error("Error retrieving city name:", error);
      throw error;
    }
  }

  useEffect(() => {
    async function fetchCurrentCity() {
      try {
        const currentCity = await getCurrentLocation(); // This is the current location city which will be the default city 
        setCity(currentCity);
        setLocation(currentCity)
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
    fetchCurrentCity();
  }, []);

  // ---------------------------   getting the data from the OpenWeatherMap API   ------------------------------

  useEffect(() => {
    if (location) {
      const API_KEY = "747dd7e44cfe0d22c7f893fd50977279";
      console.log("executed 1st")
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${API_KEY}`)
        .then(response => {
          setLocation(response.data.name)
          setHumidity(response.data.main.humidity)
          setTemperature(response.data.main.temp)
          setWind(response.data.wind.speed)
          setWeatherIconCode(response.data.weather[0].icon)
        })

        .catch(error => {
          console.log(error)
        })
    }
  }, [location])

  // ---------------------------- setting the weather icon based fetched data -----------------------------
  useEffect(() => {
    if (weatherIconCode) {
      if (weatherIconCode === '01d' || weatherIconCode === '01n') {
        setWIcon(clear_icon)
      } else if (weatherIconCode === '02d' || weatherIconCode === '02n') {
        setWIcon(cloud_icon)
      } else if (weatherIconCode === '03d' || weatherIconCode === '03n') {
        setWIcon(drizzle_icon)
      } else if (weatherIconCode === '04d' || weatherIconCode === '04n') {
        setWIcon(drizzle_icon)
      } else if (weatherIconCode === '09d' || weatherIconCode === '09n') {
        setWIcon(rain_icon)
      } else if (weatherIconCode === '10d' || weatherIconCode === '10n') {
        setWIcon(rain_icon)
      } else if (weatherIconCode === '13' || weatherIconCode === '13n') {
        setWIcon(snow_icon)
      } else {
        setWIcon(clear_icon)
      }
    }
  }, [weatherIconCode])


  function handleClickSearch() {
    setLocation(city);
  }

  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" placeholder='enter the city name' className="cityInput" value={city} onChange={(e) => setCity(e.target.value)} />
        <div className="search-icon" onClick={handleClickSearch}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wIcon} alt="" />
      </div>
      <div className="weather-temp">{temperature}°C</div>
      <div className="weather-location">{location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{wind} Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default WeatherApp



