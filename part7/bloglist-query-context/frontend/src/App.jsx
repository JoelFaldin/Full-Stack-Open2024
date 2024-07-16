import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import Login from "./components/Login"
import NewBlog from "./components/NewBlog"
import { useNotification } from "./context/notificationContext"
import { setErrorNotif, setSuccessNotif } from "./actions/notificationActions"

const App = () => {
  const { state, dispatch } = useNotification();

  const [name, setName] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )

    const loggedUserJSON = localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const name = localStorage.getItem("loggedName")
      setName(name)
    } else {
      setName(null)
    }
  }, [])

  // Function to rerender the list:
  const rerender = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  const loginUser = (user, token) => {
    setName(user)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setName(null)
  }

  const handleMessages = (object, type) => {
    if (type === "success") {
      setSuccessNotif(dispatch, object.message, 5000)
    } else if (type === "error") {
      setErrorNotif(dispatch, object.response.data.error, 5000)
    }

    rerender()
  }

  if (name === null) {
    return (
      <>
        <Login userMethod={loginUser} handleMessages={handleMessages} />
        {
          state.error && (
            <div className='errorMessage'>
              <p className='text'>{state.error}</p>
            </div>
          )
        }
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      {
        state.success && (
          <div className='message'>
            <p className='text'>{state.success}</p>
          </div>
        )
      }

      <p>{name} logged in</p>
      <button onClick={handleLogout}>
        Log out
      </button>

      <NewBlog handleMessages={handleMessages} />

      {blogs.map(blog =>
        <Blog key={blog.id} dispatch={dispatch} blog={blog} userName={name} blogs={blogs} setBlogs={setBlogs} />
      )}
      {
        state.error && (
          <div className='errorMessage'>
            <p className='text'>{state.error}</p>
          </div>
        )
      }
    </div>
  )
}

export default App