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

const update = (id, updatedNumber) => {
    const request = axios.put(`${url}/${id}`, updatedNumber)
    return request.then(res => res.data)
}

const remove = (id) => {
    const request = axios.delete(url.concat(`/${id}`))
    return request.then(res => res.data)
}

export default { getNumbers, addNumber, remove, update }