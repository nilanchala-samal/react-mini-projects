import React, { useEffect, useRef, useState } from 'react'
import './weather-app.css'
import axios from 'axios'
// import debounce from 'lodash.debounce'

import search_icon from '../../assets/search.png'
import clear_icon from '../../assets/clear.png'
import cloud_icon from '../../assets/cloud.png'
import drizzle_icon from '../../assets/drizzle.png'
import humidity_icon from '../../assets/humidity.png'
import rain_icon from '../../assets/rain.png'
import snow_icon from '../../assets/snow.png'
import wind_icon from '../../assets/wind.png'
import broken_clouds from '../../assets/broken_clouds.png'
import few_clouds from '../../assets/few_clouds.png'
import sleet from '../../assets/sleet.png'
import overcast_clouds from '../../assets/overcast_clouds.png'
import thunderstorm_with_rain from '../../assets/thunderstorm_with_rain.png'
import shower_rain from '../../assets/shower_rain.png'
import mix_snow_rain_day from '../../assets/mix_snow_rain_day.png'
import mix_snow_rain_night from '../../assets/mix_snow_rain_night.png'

import Forecast from '../forecast/Forecast'

const WeatherApp = () => {

  const [city, setCity] = useState("") // for the current city
  const [humidity, setHumidity] = useState(0)
  const [wind, setWind] = useState(0)
  const [temperature, setTemperature] = useState(0);
  const [location, setLocation] = useState(null)
  const [wIcon, setWIcon] = useState(cloud_icon)
  const [weatherIconCode, setWeatherIconCode] = useState()


  const inputRef = useRef(null)

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
      const OPENWEATHER_API_KEY = "747dd7e44cfe0d22c7f893fd50977279";
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${OPENWEATHER_API_KEY}`)
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
      } else if (weatherIconCode === '13d' || weatherIconCode === '13n') {
        setWIcon(snow_icon)
      } else {
        setWIcon(clear_icon)
      }
    }
  }, [weatherIconCode])


  // ---------------------    forecast information   ----------------
  const [forecastDay, setforecastDay] = useState([])
  const [forecastTemperature, setForecastTemperature] = useState([])
  const [forecastIcon, setForecastIcon] = useState([])

  useEffect(() => {
    if (location) {
      const WEATHERBIT_API_KEY = "ab153f8a52bd4156a2a6082739027c33";
      axios
        .get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&key=${WEATHERBIT_API_KEY}`)
        .then(response => {
          let forecastDays = [];
          let forecastTemperatures = [];
          let forecastIcons = [];

          for (let i = 1; i <= 5; i++) {
            // day information
            let date = response.data.data[i].datetime
            const dayOfWeek = new Date(date).getDay();
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            forecastDays.push(daysOfWeek[dayOfWeek].slice(0, 3))

            // temperature information
            let temp = Math.floor(response.data.data[i].high_temp) + "/" + Math.floor(response.data.data[i].low_temp)
            forecastTemperatures.push(temp)

            // weather icon information 
            let forecastIconCode = response.data.data[i].weather.icon
            if (forecastIconCode === 'c01d' || forecastIconCode === 'c01n') {
              forecastIcons.push(clear_icon)
            } else if (forecastIconCode === 'c02d' || forecastIconCode === 'c02n') {
              forecastIcons.push(few_clouds)
            } else if (forecastIconCode === 'c03d' || forecastIconCode === 'c03n') {
              forecastIcons.push(broken_clouds)
            } else if (forecastIconCode === 'c04d' || forecastIconCode === 'c04n') {
              forecastIcons.push(overcast_clouds)
            } else if (forecastIconCode === 's05d' || forecastIconCode === 's05n') {
              forecastIcons.push(sleet)
            } else if (forecastIconCode === 'c02d' || forecastIconCode === 'c02n') {
              forecastIcons.push(few_clouds)
            } else if (forecastIconCode === 'c02d' || forecastIconCode === 'c02n') {
              forecastIcons.push(few_clouds)
            } else if (forecastIconCode === 's02d' || forecastIconCode === 's02n') {
              forecastIcons.push(snow_icon)
            } else if (forecastIconCode === 'r02d' || forecastIconCode === 'r02n' || forecastIconCode === 'r01d' || forecastIconCode === 'r01n' || forecastIconCode === 'r03d' || forecastIconCode === 'r03n') {
              forecastIcons.push(rain_icon)
            } else if (forecastIconCode === 't02d' || forecastIconCode === 't02n' || forecastIconCode === 't01d' || forecastIconCode === 't01n' || forecastIconCode === 't03d' || forecastIconCode === 't03n') {
              forecastIcons.push(thunderstorm_with_rain)
            } else if (forecastIconCode === 'r04d' || forecastIconCode === 'r04n' || forecastIconCode === 'r05d' || forecastIconCode === 'r05n' || forecastIconCode === 'r06d' || forecastIconCode === 'r06n') {
              forecastIcons.push(shower_rain)
            }
            else if (forecastIconCode === 's04d') {
              forecastIcons.push(mix_snow_rain_day)
            } else if (forecastIconCode === 's04n') {
              forecastIcons.push(mix_snow_rain_night)
            } else {
              forecastIcons.push(clear_icon)
            }
          }
          setforecastDay(forecastDays)
          setForecastTemperature(forecastTemperatures)
          setForecastIcon(forecastIcons)
        })
        .catch(error => {
          console.log("Error", error)
        })
    }
  }, [location])

  useEffect(() => {
    console.log("Forecast dates", forecastDay);
    console.log("Forecast Temperatures", forecastTemperature);
    console.log("Forecast Icons", forecastIcon);
  }, [forecastDay, forecastTemperature, forecastIcon]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClickSearch();
    }
  };

  function handleClickSearch() {
    setLocation(city);
  }


  return (
    <div className='container'>
      <div className="top-bar">
        <input 
        type="text" 
        placeholder='enter the city name' 
        className="cityInput" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        onKeyDown={handleKeyDown}
        ref={inputRef}
        />
        <div className="search-icon" onClick={handleClickSearch}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wIcon} alt="" />
      </div>
      <div className="weather-temp">{Math.floor(temperature)}°C</div>
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
            <div className="wind-rate">{wind} m/s</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      {forecastTemperature.length > 0 && forecastIcon.length > 0 && forecastDay.length > 0 && (
        <div className='forecast-container'>
          <Forecast temperature={forecastTemperature[0]} icon={forecastIcon[0]} day={forecastDay[0]} />
          <Forecast temperature={forecastTemperature[1]} icon={forecastIcon[1]} day={forecastDay[1]} />
          <Forecast temperature={forecastTemperature[2]} icon={forecastIcon[2]} day={forecastDay[2]} />
          <Forecast temperature={forecastTemperature[3]} icon={forecastIcon[3]} day={forecastDay[3]} />
          <Forecast temperature={forecastTemperature[4]} icon={forecastIcon[4]} day={forecastDay[4]} />
        </div>
      )}

    </div>
  )
}

export default WeatherApp



