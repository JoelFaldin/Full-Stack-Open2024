import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'

const App = () => {
  const [name, setName] = useState(null)
  const [user, setUser] = useState('')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginUser = (user, token) => {
    setName(user)
    setUser(token)
  }

  if (name === null) {
    return (
      <>
        <Login userMethod={loginUser} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{name} logged in</p>
      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App