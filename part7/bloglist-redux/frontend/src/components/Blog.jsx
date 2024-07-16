import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { addLike, deleteBlog } from "../reducers/blogReducer";
import { newErrorNotif } from "../reducers/errNotifReducer";
import { newNotif } from "../reducers/notificationReducer";

const Blog = ({ blog, blogs }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [viewDetails, setViewDetails] = useState(false);

  const updateLikes = async () => {
    try {
      await dispatch(addLike(blog.id, blogs, user.username, user.token));
    } catch (error) {
      dispatch(newErrorNotif(error, 5000))
    }
  };

  const handleDelete = async () => {
    if (confirm(`Do you want to remove this blog? "${blog.title}"`)) {
      try {
        await dispatch(deleteBlog(blog.id, user.token));

        dispatch(newNotif("Blog deleted!", 5000))
      } catch (error) {
        dispatch(newErrorNotif(error, 5000))
      }
    }
  };

  return !viewDetails ? (
    <div className="blog">
      <span className="blog-title">{blog.title} </span>-
      <span className="blog-author"> {blog.author}</span>
      <button onClick={() => setViewDetails(true)}>show details</button>
    </div>
  ) : (
    <div className="details">
      <p>
        <span className="blog-title">{blog.title}</span>-
        <span className="blog-author">{blog.author}</span>
      </p>
      <p className="blog-url">{blog.url}</p>
      <p>
        <span className="blog-likes">
          <span id="like-number">{blog.likes}</span> likes
        </span>
        <button className="like-button" onClick={() => updateLikes()}>
          like
        </button>
      </p>
      <button onClick={() => setViewDetails(false)}>hide details</button>
      <br />
      {user.username === blog.user.name ? (
        <button onClick={handleDelete}>delete blog</button>
      ) : (
        ""
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
};

export default Blog;
