import { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"
import { setErrorNotif, setSuccessNotif } from "../actions/notificationActions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"

const Blog = ({ dispatch, blog, userName, blogs }) => {
  const queryClient = useQueryClient()

  // const deleteBlogMutation = useMutation({
  //   mutationFn: blogService.removeBlog,
  //   onSuccess: () => {
  //     const blogs = queryClient.getQueryData(["blogs"])
  //     queryClient.setQueryData(["blogs"], blogs.filter(item => item.id !== blog.id))

  //     setSuccessNotif(dispatch, `Blog "${blog.title}" removed!`, 5000)
  //   },
  //   onError: () => {
  //     setErrorNotif(dispatch, "Couldnt delete the blog", 5000)
  //   }
  // })

  // const handleDelete = async () => {
  //   if (confirm(`Do you want to remove this blog? "${blog.title}"`)) {
  //     const user = JSON.parse(localStorage.getItem("loggedUser"))
  //     deleteBlogMutation.mutate({ blogId: blog.id, token: user.token })
  //   }
  // }

  return (
    <div className="blog">
      <span className="blog-title"><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> </span>
      -
      <span className="blog-author"> {blog.author}</span>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default Blog