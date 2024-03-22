import React from 'react'
import './forecast.css'

const Forecast = ({temperature, icon, day}) => {
  return (
    <div className='forecast'>
        <img className='forecast-icon' src={icon} alt="" />
        <div className='forecast-temperature'>
            {temperature}°C
        </div>
        <div className='forecast-day'>{day}</div>
      
    </div>
  )
}

export default Forecast
