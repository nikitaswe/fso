import React from 'react'
import CountriesList from './CountriesList'
import Country from './Country'

const Content = ({ filter, toShow, countryView, handleViewChange }) => {
  if (!filter || toShow.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (toShow.length === 1) {
    return <Country country={toShow[0]} />
  } else {
    return (
      <>
        <CountriesList countries={toShow} handleViewChange={handleViewChange} />
        {countryView && <Country country={countryView} />}
      </>
    )
  }
}

export default Content
