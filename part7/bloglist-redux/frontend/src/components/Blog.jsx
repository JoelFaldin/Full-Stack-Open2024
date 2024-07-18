import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { addLike, deleteBlog } from "../reducers/blogReducer";
import { newErrorNotif } from "../reducers/errNotifReducer";
import { newNotif } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";

const Blog = ({ blog, blogs }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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

  return (
    <div className="blog">
      <span className="blog-title">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </span> -
      <span className="blog-author"> {blog.author}</span>
    </div>
  )
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
};

export default Blog;
