import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getData = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    const response = await axios.post(baseUrl, { content, votes: 0 })
    return response.data
}

export default { getData, createAnecdote }