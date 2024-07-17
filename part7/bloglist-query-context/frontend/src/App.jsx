import { useEffect } from "react"
import { Routes, Route, useMatch, useNavigate, Link } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Alert, AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material"

import blogService from "./services/blogs"
import Login from "./components/Login"
import Home from "./components/Home"
import Users from "./components/Users"
import UserData from "./components/UserData"
import BlogData from "./components/BlogData"
import { useNotifContext } from "./context/notificationContext"
import { setErrorNotif, setSuccessNotif } from "./actions/notificationActions"
import { useAuthContext } from "./context/AuthContext"
import { setUserData, clearUserData } from "./actions/authActions"

const App = () => {
  const { state, dispatch } = useNotifContext();
  const { authState, authDispatch } = useAuthContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.clear()
    clearUserData(authDispatch)
  }

  useEffect(() => {
    const loggedUserJSON = JSON.parse(localStorage.getItem("loggedUser"))
    if (loggedUserJSON && loggedUserJSON.name) {
      setUserData(authDispatch, { name: loggedUserJSON.name, username: loggedUserJSON.username, token: loggedUserJSON.token })
    }
  }, [authDispatch])

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: 1
  })

  const name = authState ? authState.name : null;
  const userMatch = useMatch("/users/:id");
  const userId = userMatch ? userMatch.params.id : null;

  const addLikeMutation = useMutation({
    mutationFn: blogService.addLike,
    onSuccess: ({ status, blog }) => {
      const blogs = queryClient.getQueryData(["blogs"])
      const updatedBlogs = blogs.map(object => {
        if (object.id === blog.id) {
          return { ...object, likes: object.likes + 1 }
        } else return object
      })

      queryClient.setQueryData(["blogs"], updatedBlogs)
    },
    onError: ({ error, blogs }) => {
      queryClient.setQueryData(["blogs"], blogs)
      setErrorNotif(dispatch, "There was an error trying to like the blog.", 5000)
    }
  })

  const updateLikes = async (blog, blogs) => {
    const user = JSON.parse(localStorage.getItem("loggedUser"))
    addLikeMutation.mutate({ blog, blogs, blogId: blog.id, username: authState.name, likes: blog.likes + 1, author: blog.author, title: blog.title, url: blog.url, token: user.token })
  }

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.removeBlog,
    onSuccess: ({ status, response, blog }) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.filter(item => item.id !== blog.id))

      setSuccessNotif(dispatch, `Blog "${blog.title}" removed!`, 5000)
    },
    onError: () => {
      setErrorNotif(dispatch, "Couldnt delete the blog", 5000)
    }
  })

  const handleDelete = async (blog) => {
    if (confirm(`Do you want to remove this blog? "${blog.title}"`)) {
      const user = JSON.parse(localStorage.getItem("loggedUser"))
      deleteBlogMutation.mutate({ blog, blogId: blog.id, token: user.token })
      navigate("/")
    }
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" />

          <Button color="inherit">
            <Link to="/">Blogs</Link>
          </Button>
          <Button color="inherit">
            <Link to="/users">Users</Link>
          </Button>
        </Toolbar>
      </AppBar>

      {authState && (
        <Box sx={{ pt: 2, pb: 2 }}>
          <Typography variant="h2">
            Blogs
          </Typography>
          <Typography variant="body1">
            {authState.name} logged in
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Log out
          </Button>
        </Box>
      )}

      <div>
        <Routes>
          <Route path="/" element={authState ? <Home result={result} state={state} dispatch={dispatch} authState={authState} authDispatch={authDispatch} /> : <Login dispatch={dispatch} authDispatch={authDispatch} />} />
          <Route path="/login" element={<Login dispatch={dispatch} authDispatch={authDispatch} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserData userId={userId} name={name} />} />
          <Route path="/blogs/:id" element={<BlogData dispatch={dispatch} blogs={result} updateLikes={updateLikes} handleDelete={handleDelete} />} />
        </Routes>

        {state.success && (
          <Alert severity="success">
            <p className='text'>{state.success}</p>
          </Alert>
        )}
        {state.error && (
          <Alert severity="error">
            <p className='text'>{state.error}</p>
          </Alert>
        )}
      </div>
    </Container>
  )
}

export default App