import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
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