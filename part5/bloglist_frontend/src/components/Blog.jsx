import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, userName, blogs, setBlogs }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const updateLikes = async () => {
    const token = localStorage.getItem('loggedToken')

    const updatedBlogs = blogs.map(object => {
      if (object.id === blog.id) {
        return { ...object, likes: object.likes + 1}
      } else {
        return object
      }
    })

    setBlogs(updatedBlogs)

    try {
      const likesRequest = await blogService.addLike(blog.id, userName, blog.likes + 1, blog.author, blog.title, blog.url, token)
      if (likesRequest !== 200) {
        throw new Error('There was a problem updating the likes.')
      }
    } catch (error) {
      setBlogs(blogs)
    }
  }

  return !viewDetails ? (
    <div>
      {blog.title}
      <button onClick={() => setViewDetails(true)}>show details</button>
    </div>
  ) : (
    <div className="details">
      <p>{blog.title}</p>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes
        <button onClick={() => updateLikes()}>like</button>
      </p>
      <p>{blog.author}</p>
      <button onClick={() => setViewDetails(false)}>hide details</button>
    </div>
  )
}

export default Blog