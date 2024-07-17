import { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotifContext } from "../context/notificationContext"
import { setErrorNotif, setSuccessNotif } from "../actions/notificationActions"
import { Box, Button, TextField, Typography } from "@mui/material"

const NewBlog = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotifContext()

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const newBlogMutation = useMutation({
    mutationFn: blogService.newBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog.blog))

      setSuccessNotif(dispatch, newBlog.message, 5000)
      setTitle("")
      setAuthor("")
      setUrl("")
      setIsVisible(false)
    },
    onError: () => {
      setErrorNotif(dispatch, "there was an error when saving the blog.", 5000)
    },
  })

  const handleCreate = (event) => {
    event.preventDefault()
    const user = JSON.parse(localStorage.getItem("loggedUser"))
    newBlogMutation.mutate({ title, author, url, token: user.token })
  }

  return isVisible ? (
    <>
      <Typography variant="h4" component="h1" gutterBottom>Create a new blog:</Typography>
      <form>
        <Box mb={2}>
          <TextField
            label="Title"
            id="title"
            type="text"
            onChange={event => setTitle(event.target.value)}
            placeholder="Blog title"
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Author"
            id="author"
            type="text"
            onChange={event => setAuthor(event.target.value)}
            placeholder="Blog author"
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Url"
            id="url"
            type="text"
            onChange={event => setUrl(event.target.value)}
            placeholder="Blog url"
          />
        </Box>
        <Box mb={2}>
          <Button variant="contained" onClick={event => handleCreate(event)}>
            Create
          </Button>
        </Box>
      </form>
      <Button variant="contained" color="error" onClick={() => setIsVisible(false)}>
        cancel
      </Button>
    </>
  ) : (
    <Button variant="contained" onClick={() => setIsVisible(true)}>
      new blog
    </Button>
  )
}

NewBlog.propTypes = {
  handleMessages: PropTypes.func.isRequired
}

export default NewBlog