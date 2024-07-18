import { useSelector } from "react-redux"

import NewBlog from "./NewBlog"
import Blog from "./Blog"

const Home = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      <NewBlog />

      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          userName={user.name}
          blogs={blogs}
          setBlogs={() => null}
        />
      ))}
    </>
  )
}

export default Home