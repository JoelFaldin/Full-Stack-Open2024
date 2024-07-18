import { useDispatch, useSelector } from "react-redux"
import { useMatch, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Box, Button, Link, List, ListItem, TextField, Typography } from "@mui/material"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"

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
    return <Typography>Loading data...</Typography>
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
    <Box sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Typography variant="h4">{matchingBlog.title}</Typography>
      <Link variant="body2" underline="hover" href={matchingBlog.url}>{matchingBlog.url}</Link>

      <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Typography variant="body1">{matchingBlog.likes} likes</Typography>
      </Box>
      <Button variant="contained" onClick={updateLikes}>like</Button>

      <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Typography variant="subtitle1">Added by <strong>{matchingBlog.author}</strong></Typography>
      </Box>

      <Button variant="contained" color="error" onClick={handleDelete}>delete blog</Button>

      <Box sx={{ paddingTop: 3, paddingBottom: 3 }}>
        <Typography variant="subtitle1"><strong>Comments</strong></Typography>

        <TextField label="Comment" value={message} onChange={event => setMessage(event.target.value)} />
        <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
          <Button variant="contained" onClick={sendComment}>add comment</Button>
        </Box>

        <List>
          {messages.map(message => (
            <ListItem key={message.id}>
              <ArrowRightIcon />
              <Typography variant="body2">{message.message}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default BlogData