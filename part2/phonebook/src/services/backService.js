import axios from "axios";
const url = 'http://localhost:3001/persons'

const getNumbers = () => {
    const request = axios.get(url)
    return request.then(res => res.data)
}

const addNumber = (newNumber) => {
    const request = axios.post(url, newNumber)
    return request.then(res => res.data)
}

export default { getNumbers, addNumber }