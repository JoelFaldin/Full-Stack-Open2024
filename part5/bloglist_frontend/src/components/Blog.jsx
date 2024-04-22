import { useState } from "react"

const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false)

  return !viewDetails ? (
    <div>
      {blog.title}
      <button onClick={() => setViewDetails(true)}>show details</button>
    </div>
  ): (
    <div className="details">
      <p>{blog.title}</p>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes
        <button>like</button>
      </p>
      <p>{blog.author}</p>
      <button onClick={() => setViewDetails(false)}>hide details</button>
    </div>
  )
}

export default Blog