import React from 'react'

const CountriesList = ({ countries, handleViewChange }) => {
  return (
    <div>
      <ul>
        {countries.map(country => (
          <li key={country.cca2}>
            {country.name.common} <button onClick={() => handleViewChange(country)}>show</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CountriesList
