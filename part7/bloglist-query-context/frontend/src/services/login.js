import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
    const request = await axios.post(baseUrl, { username, password })
    return request.data
}

export default { login }