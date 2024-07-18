import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useMatch } from "react-router-dom"

import { initializeUserBlogs } from "../reducers/userBlogsReducer"
import { setUsersData } from "../reducers/userDataReducer"

const UserData = () => {
  const dispatch = useDispatch()
  const userBlogs = useSelector(state => state.userBlogs)
  const userData = useSelector(state => state.userData)

  const match = useMatch("/users/:id")
  const id = match ? match.params.id : null

  useEffect(() => {
    dispatch(initializeUserBlogs(id))
    dispatch(setUsersData())
  }, [dispatch, id])

  if (!userBlogs || !userData) {
    return <div>Loading user data...</div>
  }

  const singularUser = userData.find(item => item._id === id)

  return (
    <>
      <h2>{singularUser.username}</h2>
      <h3>Added blogs</h3>

      {userBlogs.length === 0 ? (
        <div>This user has no blogs submitted.</div>
      ) : (
        <ul>
          {userBlogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul >
      )}
    </>
  )
}

export default UserData