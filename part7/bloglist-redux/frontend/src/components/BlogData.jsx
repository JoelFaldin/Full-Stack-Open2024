import { useDispatch, useSelector } from "react-redux"
import { useMatch, useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import { initializeComments } from "../reducers/commentsReducer"
import { submitComment } from "../reducers/commentsReducer"
import { newNotif } from "../reducers/notificationReducer"
import { newErrorNotif } from "../reducers/errNotifReducer"
import { addLike, deleteBlog } from "../reducers/blogReducer"

const BlogData = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const messages = useSelector(state => state.comments)
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const [message, setMessage] = useState("")

  const match = useMatch("/blogs/:id")
  const id = match.params.id

  useEffect(() => {
    dispatch(initializeComments(id))
  }, [dispatch, id])

  const sendComment = async () => {
    try {
      await dispatch(submitComment(message, id))

      setMessage("")
    } catch (error) {
      dispatch(newErrorNotif(error.message), 5000)
    }
  }

  const matchingBlog = blogs.find(blog => blog.id === id)

  if (!matchingBlog || !messages) {
    return <div>Loading data...</div>
  }

  const updateLikes = async () => {
    try {
      await dispatch(addLike(matchingBlog.id, blogs, user.username, user.token));
    } catch (error) {
      dispatch(newErrorNotif(error, 5000))
    }
  }

  const handleDelete = async () => {
    if (confirm(`Do you want to remove this blog? "${matchingBlog.title}"`)) {
      try {
        await dispatch(deleteBlog(matchingBlog.id, user.token));

        dispatch(newNotif("Blog deleted!", 5000))
        navigate("/")
      } catch (error) {
        dispatch(newErrorNotif(error, 5000))
      }
    }
  };

  return (
    <>
      <h2>{matchingBlog.title}</h2>
      <a href={matchingBlog.url}>{matchingBlog.url}</a>

      <p>
        <span>{matchingBlog.likes} likes</span>
        <button onClick={updateLikes}>like</button>
      </p>

      <p>Added by <strong>{matchingBlog.author}</strong></p>

      <button onClick={handleDelete}>delete blog</button>

      <h3>comments</h3>

      <input value={message} onChange={event => setMessage(event.target.value)} />
      <button onClick={sendComment}>add comment</button>

      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.message}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogData