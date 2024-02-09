import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import NewUser from './components/NewUser'

const App = () => {
  const [name, setName] = useState(null)
  const [user, setUser] = useState()
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const name = localStorage.getItem('loggedName')
      const token = localStorage.getItem('loggedToken')
      setName(name)
      setUser(token)
    } else {
      setName(null)
      setUser('')
    }
  }, [])

  const loginUser = (user, token) => {
    setName(user)
    setUser(token)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setName(null)
    setUser('')
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
      <button onClick={handleLogout}>
        Log out
      </button>

      <NewUser />

      <p>{name} logged in</p>
      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App