import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import blogService from "../services/blogs"
import Blog from "./Blog"
import Login from "./Login"
import NewBlog from "./NewBlog"
import { setErrorNotif, setSuccessNotif } from "../actions/notificationActions"
import { clearUserData, setUserData } from "../actions/authActions"

const Home = ({ state, dispatch, authState, authDispatch }) => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
    retry: 1
  })

  const blogs = result.data

  useEffect(() => {
    const loggedUserJSON = JSON.parse(localStorage.getItem("loggedUser"))
    if (loggedUserJSON && loggedUserJSON.name) {
      setUserData(authDispatch, { name: loggedUserJSON.name, username: loggedUserJSON.username, token: loggedUserJSON.token })
    }
  }, [authDispatch])

  const handleLogout = () => {
    window.localStorage.clear()
    clearUserData(authDispatch)
  }

  const handleMessages = (object, type) => {
    if (type === "success") {
      setSuccessNotif(dispatch, object.message, 5000)
    } else if (type === "error") {
      setErrorNotif(dispatch, object.response.data.error, 5000)
    }
  }

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (!authState) {
    return (
      <>
        <Login dispatch={dispatch} authDispatch={authDispatch} />
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
      {/* <h2>blogs</h2>

      <p>{authState.name} logged in</p> */}
      <button onClick={handleLogout}>
        Log out
      </button>

      <NewBlog handleMessages={handleMessages} />

      {blogs.map(blog =>
        <Blog key={blog.id} dispatch={dispatch} blog={blog} userName={authState.name} blogs={blogs} />
      )}
    </div>
  )
}

export default Home