import React from 'react'

const WeatherWidget = ({ country, weather }) => {
  return (
    <>
      <h3>Weather in {country.capital[0]}</h3>
      <img
        src={`http://openweathermap.org/img/wn/${weather['weather'][0].icon}@2x.png`}
        alt="icon"
      />
      <p>
        <strong>temperature:</strong> {weather.main.temp}
      </p>
      <p>
        <strong>humidity:</strong> {weather.main.humidity}
      </p>
      <p>
        <strong>wind:</strong> {weather.wind.speed}
      </p>
    </>
  )
}

export default WeatherWidget
