import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
import { Box, List, ListItem, ListItemIcon, Typography } from "@mui/material"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"

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
    return <Typography>Loading user data...</Typography>
  }

  const singularUser = userData.find(item => item._id === id)

  return (
    <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
      <Typography variant="h4" component="h4">{singularUser.username}</Typography>

      <Box sx={{ paddingTop: 3 }}>
        <Typography variant="h6">Added blogs</Typography>
      </Box>

      {userBlogs.length === 0 ? (
        <Typography variant="body1">This user has no blogs submitted.</Typography>
      ) : (
        <List>
          {userBlogs.map(blog => (
            <ListItem key={blog.id}>
              <ArrowRightIcon />
              <Typography variant="body2">{blog.title}</Typography>
            </ListItem>
          ))}
        </List >
      )}
    </Box>
  )
}

export default UserData