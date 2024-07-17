import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { TableRow, TableCell } from "@mui/material"

const Blog = ({ blog }) => {
  return (
    <TableRow className="blog">
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>
        {blog.author}
      </TableCell>
    </TableRow>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default Blog