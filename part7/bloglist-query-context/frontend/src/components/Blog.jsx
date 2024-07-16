import { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"
import { setErrorNotif, setSuccessNotif } from "../actions/notificationActions"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const Blog = ({ dispatch, blog, userName, blogs }) => {
  const queryClient = useQueryClient()

  const [viewDetails, setViewDetails] = useState(false)

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.removeBlog,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.filter(item => item.id !== blog.id))

      setSuccessNotif(dispatch, `Blog "${blog.title}" removed!`, 5000)
    },
    onError: () => {
      setErrorNotif(dispatch, "Couldnt delete the blog", 5000)
    }
  })

  const addLikeMutation = useMutation({
    mutationFn: blogService.addLike,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(["blogs"])
      const updatedBlogs = blogs.map(object => {
        if (object.id === blog.id) {
          return { ...object, likes: object.likes + 1 }
        } else return object
      })

      queryClient.setQueryData(["blogs"], updatedBlogs)
    },
    onError: () => {
      queryClient.setQueryData(["blogs"], blogs)
      setErrorNotif(dispatch, "There was an error trying to like the blog.", 5000)
    }
  })

  const updateLikes = async () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"))
    addLikeMutation.mutate({ blogId: blog.id, userName, likes: blog.likes + 1, author: blog.author, title: blog.title, url: blog.url, token: user.token })
  }

  const handleDelete = async () => {
    if (confirm(`Do you want to remove this blog? "${blog.title}"`)) {
      const user = JSON.parse(localStorage.getItem("loggedUser"))
      deleteBlogMutation.mutate({ blogId: blog.id, token: user.token })
    }
  }

  return !viewDetails ? (
    <div className="blog">
      <span className="blog-title">{blog.title} </span>
      -
      <span className="blog-author"> {blog.author}</span>
      <button onClick={() => setViewDetails(true)}>show details</button>
    </div>
  ) : (
    <div className="details">
      <p>
        <span className="blog-title">{blog.title}</span>
        -
        <span className="blog-author">{blog.author}</span>
      </p>
      <p className="blog-url">{blog.url}</p>
      <p>
        <span className="blog-likes"><span id="like-number">{blog.likes}</span> likes</span>
        <button className="like-button" onClick={() => updateLikes()}>like</button>
      </p>
      <button onClick={() => setViewDetails(false)}>hide details</button><br />
      {
        userName === blog.user.name ? (
          <button onClick={handleDelete}>delete blog</button>
        ) : ("")
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default Blog