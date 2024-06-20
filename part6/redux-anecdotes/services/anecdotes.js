import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getData = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default getData