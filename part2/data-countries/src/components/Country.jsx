import { useState } from "react"
import weatherService from "../services/weatherService"

const Country = ({ country }) => {
    const [temp, setTemp] = useState(0)
    const [icon, setIcon] = useState('')
    if (country === null) {
        return null
    }
    const languages = Object.values(country.languages)

    weatherService.getWeather(country.capital)
        .then(data => {
            setTemp(Math.floor(data.main.feels_like - 273.15))
            setIcon(data.weather[0].icon)
        })

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages:</h2>
            <ul>
                {languages.map((countryName, index) => 
                    <li key={index}>{countryName}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <h3>Weather in {country.capital}</h3>
            <p>Temperature: {temp}°C</p>
            {
                icon ? <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='Weather icon' /> : ''
            }
            
        </>
    )
}

export default Country