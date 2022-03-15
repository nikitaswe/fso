import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = countryName => {
  const [name, setName] = useState(countryName)
  const [content, setContent] = useState(null)

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(response => {
        setContent(response.data[0])
      })
      .catch(err => setContent(null))
  }, [name])

  const onChange = event => {
    setName(event.target.value)
  }

  return {
    name,
    content,
    onChange
  }
}
