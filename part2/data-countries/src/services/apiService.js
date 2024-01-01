import axios from "axios";
const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getCountries = () => {
    const request = axios.get(url)
    return request.then(res => res.data)
}

export default { getCountries }