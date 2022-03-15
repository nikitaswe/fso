import React, { useEffect, useState } from 'react'
import WeatherWidget from './WeatherWidget'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&APPID=${api_key}`
      )
      .then(response => {
        setWeather(response.data)
      })
  }, [country])
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.languages).map(key => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} title="flag" alt="flag" />
      {weather && <WeatherWidget country={country} weather={weather} />}
    </div>
  )
}

export default Country
