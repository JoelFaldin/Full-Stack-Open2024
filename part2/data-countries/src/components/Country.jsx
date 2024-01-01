const Country = ({ country }) => {
    if (country === null) {
        return null
    }
    const languages = Object.values(country.languages)
    console.log(country.flags)
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
        </>
    )
}

export default Country