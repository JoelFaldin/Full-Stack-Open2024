import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newBlog = async (title, author, url, token) => {
  const response = await axios.post('/api/blogs', { title, author, url }, { headers: { Authorization: `Bearer ${token}` } })
  return response.data
}

export default { getAll, newBlog }