import { useState } from "react"
import Country from "./Country"

const CountriesList = ({ data }) => {
    if (data === null) {
        return null
    }

    const [content, setContent] = useState(null)

    const handleClick = () => {
        setContent(data)
    }

    return (
        <div>
            <p style={{display: "inline", marginRight: "5px"}}>{data.name.common}</p>
            <button onClick={handleClick} style={{display: "inline", marginLeft: "5px"}}>show</button>
            <Country country={content} />
        </div>
    )
}

export default CountriesList