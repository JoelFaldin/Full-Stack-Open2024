import axios from "axios"
const apiKey = import.meta.env.VITE_KEY

const getWeather = async (cityName) => {
    try {
        const request = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        if (request.status === 200) {
            return request.data
        }
    } catch (error) {
        console.error('There was an error D:', error)
        throw error
    }
}

export default { getWeather }

// set "VITE_KEY=THE_KEY" && npm run dev