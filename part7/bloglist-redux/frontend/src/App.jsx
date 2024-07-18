import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom"
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material"

import Home from "./components/Home";
import Login from "./components/Login";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";
import User from "./components/User";
import UserData from "./components/UserData";
import BlogData from "./components/BlogData";
import { logOutUser, setUserData } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())

    const loggedUserJSON = JSON.parse(localStorage.getItem("loggedUser"))
    if (loggedUserJSON) {
      dispatch(setUserData(loggedUserJSON))
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logOutUser());
    localStorage.removeItem("loggedUser");
  };

  if (!user) {
    return (
      <>
        <Login />
        <ErrorNotification />
      </>
    );
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
            <Link to="/">blogs</Link>
          </Button>
          <Button color="inherit">
            <Link to="/users">users</Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h4">Blogs</Typography>

      <Typography>{user.name} logged in</Typography>
      <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>Log out</Button>
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<User />} />
        <Route path="/users/:id" element={<UserData />} />
        <Route path="/blogs/:id" element={<BlogData />} />
      </Routes>
      <Notification />
      <ErrorNotification />
    </Container >
  );
};

export default App;
