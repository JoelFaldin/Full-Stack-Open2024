import { useQuery } from "@tanstack/react-query"
import userService from "../services/users"
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import BookmarkIcon from "@mui/icons-material/Bookmark";

const UserData = ({ name, userId }) => {
  const result = useQuery({
    queryKey: ["userBlogs", userId],
    queryFn: ({ queryKey }) => userService.getUserBlogs(queryKey[1]),
    retry: 1
  })

  const blogs = result.data

  if (result.isLoading) {
    return <Typography>Loading user blogs...</Typography>
  } else if (result.data.length === 0) {
    return <Typography>This user has no submitted blogs.</Typography>
  }

  return (
    <>
      <Box sx={{ pt: 2, pb: 2 }}>
        <Typography variant="h5">
          {name}
        </Typography>
      </Box>
      <Typography>Added blogs:</Typography>
      <List>
        {blogs.map(blog => (
          <ListItem key={blog.id}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText>
              {blog.title}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default UserData