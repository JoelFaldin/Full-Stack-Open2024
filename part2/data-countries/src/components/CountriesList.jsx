const CountriesList = ({ countries }) => {
    if (countries === null) {
        return null
    }
    // console.log(countries[0].name.common)
    return (
        <div>
            {countries.map((element, index) => (
                <p key={index}>{element.name.common}</p>
            ))}
        </div>
    )
}

export default CountriesList