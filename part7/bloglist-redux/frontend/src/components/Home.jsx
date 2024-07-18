import { useSelector } from "react-redux"

import NewBlog from "./NewBlog"
import Blog from "./Blog"
import { Paper, Table, TableBody, TableContainer, TableRow } from "@mui/material"

const Home = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      <NewBlog />

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog => (
              <TableRow key={blog.id}>
                <Blog
                  blog={blog}
                  userName={user.name}
                  blogs={blogs}
                  setBlogs={() => null}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Home