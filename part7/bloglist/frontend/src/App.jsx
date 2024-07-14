import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { newNotif } from "./reducers/notificationReducer"
import { newErrorNotif } from "./reducers/errNotifReducer";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState(null);
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const loggedUserJSON = localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const name = localStorage.getItem("loggedName");
      const token = localStorage.getItem("loggedToken");
      setName(name);
      setUser(token);
    } else {
      setName(null);
      setUser("");
    }
  }, []);

  // Function to rerender the list:
  const rerender = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  const loginUser = (user, token) => {
    setName(user);
    setUser(token);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setName(null);
    setUser("");
  };

  const handleMessages = (object, type) => {
    if (type === "success") {
      dispatch(newNotif(object.message, 5000));
    } else if (type === "error") {
      dispatch(newErrorNotif(object.response.data.error, 5000));
    }

    rerender();
  };

  if (name === null) {
    return (
      <>
        <Login userMethod={loginUser} handleMessages={handleMessages} />
        {/* {errorMessage !== "" ? (
          <div className="errorMessage">
            <p className="text">{errorMessage}</p>
          </div>
        ) : (
          ""
        )} */}
        <ErrorNotification />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{name} logged in</p>
      <button onClick={handleLogout}>Log out</button>

      <NewBlog handleMessages={handleMessages} />

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          userName={name}
          blogs={blogs}
          setBlogs={setBlogs}
          handleMessages={handleMessages}
        />
      ))}
      {/* {errorMessage !== "" ? (
        <div className="errorMessage">
          <p className="text">{errorMessage}</p>
        </div>
      ) : (
        ""
      )} */}
      <ErrorNotification />
    </div>
  );
};

export default App;
