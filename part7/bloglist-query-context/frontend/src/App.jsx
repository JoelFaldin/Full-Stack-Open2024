import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import blogService from "./services/blogs"
import Blog from "./components/Blog"
import Login from "./components/Login"
import NewBlog from "./components/NewBlog"
import { useNotification } from "./context/notificationContext"
import { setErrorNotif, setSuccessNotif } from "./actions/notificationActions"

const App = () => {
  const { state, dispatch } = useNotification();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
    retry: 1
  })

  const blogs = result.data

  const [name, setName] = useState(null)

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const name = localStorage.getItem("loggedName")
      setName(name)
    } else {
      setName(null)
    }
  }, [])

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  // Function to rerender the list:
  // const rerender = () => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs(blogs)
  //   )
  // }

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

    // rerender()
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
        <Blog key={blog.id} dispatch={dispatch} blog={blog} userName={name} blogs={blogs} />
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