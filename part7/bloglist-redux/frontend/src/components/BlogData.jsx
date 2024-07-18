import { useSelector } from "react-redux"
import { useMatch } from "react-router-dom"

const BlogData = () => {
  const blogs = useSelector(state => state.blogs)

  const match = useMatch("/blogs/:id")
  const id = match.params.id

  const matchingBlog = blogs.find(blog => blog.id === id)

  if (!matchingBlog) {
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
    </>
  )
}

export default BlogData