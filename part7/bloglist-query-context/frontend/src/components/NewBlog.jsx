import { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotifContext } from "../context/notificationContext"
import { setErrorNotif, setSuccessNotif } from "../actions/notificationActions"

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
      <h1>Create a new blog:</h1>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            onChange={event => setTitle(event.target.value)}
            placeholder="Blog title"
          />
        </div>

        <div>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            onChange={event => setAuthor(event.target.value)}
            placeholder="Blog author"
          />
        </div>

        <div>
          <label htmlFor="url">Url:</label>
          <input
            id="url"
            type="text"
            onChange={event => setUrl(event.target.value)}
            placeholder="Blog url"
          />
        </div>
        <button onClick={event => handleCreate(event)}>
          Create
        </button>
      </form>
      <button onClick={() => setIsVisible(false)}>cancel</button>
    </>
  ) : (
    <div>
      <button className="showForm" id="showForm" onClick={() => setIsVisible(true)}>new blog</button>
    </div>
  )
}

NewBlog.propTypes = {
  handleMessages: PropTypes.func.isRequired
}

export default NewBlog