import React from 'react'
import './forecast.css'

const Forecast = ({temperature, icon, day}) => {
  // console.log(temperature)
  const temperatures = temperature.split("/")
  const highTemperature = temperatures[0]
  const lowTemperature = temperatures[1]
  return (
    <div className='forecast'>
        <img className='forecast-icon' src={icon} alt="" />
        <div className='forecast-temperature'>
            <span className='forecast-high-temp'>{highTemperature}°</span>&nbsp;
            <span className='forecast-low-temp'>{lowTemperature}°</span>
        </div>
        <div className='forecast-day'>{day}</div>
      
    </div>
  )
}

export default Forecast
