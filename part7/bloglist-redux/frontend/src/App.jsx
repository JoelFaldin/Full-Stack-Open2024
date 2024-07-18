import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom"

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

  return (
    <>
      <h2>blogs</h2>

      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Log out</button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<User />} />
        <Route path="/users/:id" element={<UserData />} />
        <Route path="/blogs/:id" element={<BlogData />} />
      </Routes>
      <Notification />
      <ErrorNotification />
    </>
  );
};

export default App;
