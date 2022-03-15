import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Content from './components/Content'
import Filter from './components/Filter'

import { useCountry } from './hooks'

const HookCounty = () => {
  const country = useCountry('belarus')
  return (
    <>
      <input onChange={country.onChange} value={country.name} />
      {country.content ? (
        <div>
          <h2>{country.content.name.common}</h2>
          <p>Capital: {country.content.capital[0]}</p>
          <p>Population: {country.content.population}</p>
          <h3>Languages</h3>
          <ul>
            {Object.keys(country.content.languages).map(key => (
              <li key={key}>{country.content.languages[key]}</li>
            ))}
          </ul>
          <img src={country.content.flags.png} title="flag" alt="flag" />
        </div>
      ) : (
        'not found ...'
      )}
    </>
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [toShow, setToShow] = useState([])
  const [countryView, setCountryView] = useState(null)
  const handleFilterChange = e => setFilter(e.target.value)
  const handleViewChange = country => {
    setCountryView(country)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    const filtered = countries.filter(c =>
      c.name.common.toLowerCase().includes(filter.toLowerCase())
    )
    setToShow(filtered)
    setCountryView(null)
  }, [countries, filter])

  return (
    <>
      <HookCounty />
      <Filter filter={filter} onChange={handleFilterChange} />
      <Content
        filter={filter}
        toShow={toShow}
        countryView={countryView}
        handleViewChange={handleViewChange}
      />
    </>
  )
}

export default App
