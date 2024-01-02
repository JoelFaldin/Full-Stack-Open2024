import { useEffect } from "react"
import { useState } from "react"
import countries from './services/apiService'
import Warning from "./components/Warning"
import CountriesList from "./components/CountriesList"
import Country from "./components/Country"

function App() {
  const [countriesCollection, setCountriesCollection] = useState([])
  const [matching, setMatching] = useState(null)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [uniqueCountry, setUniqueCountry] = useState(null)
  
  useEffect(() => {
    countries
      .getCountries()
      .then(newCountries => {
        setCountriesCollection(newCountries)
      })
  }, [])

  useEffect(() => {
    const result = countriesCollection.filter(element => element.name.common.toLowerCase().includes(search.toLowerCase()))
    if (result.length > 10) {
      setMessage('Too many matches, be more specific.')
      setMatching(null)
      setUniqueCountry(null)
    } else if (result.length < 10 && result.length > 1) {
      setMessage(null)
      setMatching(result)
      setUniqueCountry(null)
    } else if (result.length === 1) {
      setMessage(null)
      setMatching(null)
      setUniqueCountry(result[0])
    }
  }, [search])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <p>Find countries:</p>
      <input value={search} onChange={handleSearch} />

      <Warning msg={message} />
      {
        matching === null ? '' :
          matching.map((country, index) => (
            <CountriesList key={index} data={country} />
          ))
          
      }      
      <Country country={uniqueCountry} />
    </>
  )
}

export default App
