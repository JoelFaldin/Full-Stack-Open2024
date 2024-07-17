import { useQuery } from "@tanstack/react-query"
import userService from "../services/users"

const UserData = ({ name, userId }) => {
  const result = useQuery({
    queryKey: ["userBlogs", userId],
    queryFn: ({ queryKey }) => userService.getUserBlogs(queryKey[1]),
    retry: 1
  })

  const blogs = result.data

  if (result.isLoading) {
    return <div>Loading user blogs...</div>
  } else if (result.data.length === 0) {
    return <h3>This user has no submitted blogs.</h3>
  }

  return (
    <>
      <h2>{name}</h2>
      <h3>Added blogs:</h3>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserData