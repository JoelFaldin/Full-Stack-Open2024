import { useDispatch, useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
import { useEffect } from "react"
import { initializeComments } from "../reducers/commentsReducer"

const BlogData = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const messages = useSelector(state => state.comments)

  const match = useMatch("/blogs/:id")
  const id = match.params.id

  useEffect(() => {
    dispatch(initializeComments(id))
  }, [dispatch, id])


  const matchingBlog = blogs.find(blog => blog.id === id)

  if (!matchingBlog || !messages) {
    return <div>Loading data...</div>
  }

  return (
    <>
      <h2>{matchingBlog.title}</h2>
      <a href={matchingBlog.url}>{matchingBlog.url}</a>

      <p>
        <span>{matchingBlog.likes} likes</span>
        <button>like</button>
      </p>

      <p>Added by <strong>{matchingBlog.author}</strong></p>

      <h3>comments</h3>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.message}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogData