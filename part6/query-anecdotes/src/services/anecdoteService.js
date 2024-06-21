import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const addAnecdote = async (newAnecdote) => {
    const response = await axios.post(baseUrl, { content: newAnecdote.content, votes: 0 })
    return response.data
}

export const udpateAnecdote = async (updatedAnecdote) => {
    // console.log(updatedAnecdote)
    const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, { content: updatedAnecdote.content, votes: updatedAnecdote.votes })
    return response.data
}