import { useEffect } from "react"
import { TableContainer, Paper, Table, TableBody, Box } from "@mui/material"

import Blog from "./Blog"
import Login from "./Login"
import NewBlog from "./NewBlog"
import { setErrorNotif, setSuccessNotif } from "../actions/notificationActions"
import { setUserData } from "../actions/authActions"

const Home = ({ result, state, dispatch, authState, authDispatch }) => {
  const blogs = result.data

  useEffect(() => {
    const loggedUserJSON = JSON.parse(localStorage.getItem("loggedUser"))
    if (loggedUserJSON && loggedUserJSON.name) {
      setUserData(authDispatch, { name: loggedUserJSON.name, username: loggedUserJSON.username, token: loggedUserJSON.token })
    }
  }, [authDispatch])

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
      <Box sx={{ pt: 2, pb: 2 }}>
        <NewBlog handleMessages={handleMessages} />
      </Box>


      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog =>
              <Blog key={blog.id} dispatch={dispatch} blog={blog} userName={authState.name} blogs={blogs} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home