import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newBlog = async (title, author, url, token) => {
  const response = await axios.post(baseUrl, { title, author, url }, { headers: { Authorization: `Bearer ${token}` } })
  return response.data
}

const addLike = async (blogId, user, likes, author, title, url, token) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, { user, likes, author, title, url }, { headers: { Authorization: `Bearer ${token}` } })
  return response.status
}

export default { getAll, newBlog, addLike }