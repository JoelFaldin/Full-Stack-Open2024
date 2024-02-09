import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import NewUser from './components/NewBlog'

const App = () => {
  const [name, setName] = useState(null)
  const [user, setUser] = useState()
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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

  // Function to rerender the list:
  const rerender = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const loginUser = (user, token) => {
    setName(user)
    setUser(token)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setName(null)
    setUser('')
  }

  const handleMessages = (object, type) => {
    if (type === 'success') {
      setMessage(object.message)
    } else if (type === 'error') {
      setErrorMessage(object.response.data.error)
    }

    rerender()
    setTimeout(() => {
      setMessage('')
      setErrorMessage('')
    }, 5000)
  }

  if (name === null) {
    return (
      <>
        <Login userMethod={loginUser} handleMessages={handleMessages} />
        {
          errorMessage !== ''
          ? (
            <div className='errorMessage'>
              <p className='text'>{errorMessage}</p>
            </div>
          ) : ''
        }
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      {
        message !== ''
        ? (
          <div className='message'>
            <p className='text'>{message}</p>
          </div>
        ) : ''
      }

      <p>{name} logged in</p>
      <button onClick={handleLogout}>
        Log out
      </button>

      <NewUser handleMessages={handleMessages} />

      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App