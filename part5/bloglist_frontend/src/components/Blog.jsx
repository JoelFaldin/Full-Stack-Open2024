import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, userName, blogs, setBlogs, handleMessages }) => {
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

  const handleDelete = async () => {
    if (confirm(`Do you want to remove this blog? "${blog.title}"`)) {
      const token = localStorage.getItem('loggedToken')
      try {
        const removeRequest = await blogService.removeBlog(blog.id, token)
        if (removeRequest.status !== 204) {
          throw new Error('test')
        }

        const updatedBlogs = blogs.filter(object => {
          return object.id !== blog.id
        })

        setBlogs(updatedBlogs)
      } catch (error) {
        handleMessages(error, 'error')
      }
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
      <button onClick={() => setViewDetails(false)}>hide details</button><br />
      {
        userName === blog.user.name ? (
          <button onClick={handleDelete}>delete blog</button>
        ) : ('')
      }
    </div>
  )
}

export default Blog