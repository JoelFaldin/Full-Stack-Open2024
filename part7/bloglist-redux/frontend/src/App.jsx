import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";
import { logOutUser, setUserData } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

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
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Log out</button>

      <NewBlog />

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          userName={user.name}
          blogs={blogs}
          setBlogs={() => null}
        />
      ))}
      <ErrorNotification />
    </div>
  );
};

export default App;
