import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMatch } from "react-router-dom"
import { useState } from "react";
import { Box, Button, Link, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import Person from "@mui/icons-material/Person";

import messageService from "../services/messages"
import { setErrorNotif } from "../actions/notificationActions"

const BlogData = ({ dispatch, blogs, updateLikes, handleDelete }) => {
  const queryClient = useQueryClient();
  const match = useMatch("/blogs/:id");
  const blogId = match.params.id

  const [comment, setComment] = useState("")

  const messages = useQuery({
    queryKey: ["messages", blogId],
    queryFn: ({ queryKey }) => messageService.getMessages(queryKey[1]),
    retry: 1,
    enabled: !!blogId
  })

  const messageMutation = useMutation({
    mutationFn: messageService.postMessage,
    onSuccess: ({ response }) => {
      const messages = queryClient.getQueryData(["messages", blogId])

      queryClient.setQueryData(["messages", blogId], [...messages, response.message])
    },
    onError: (error) => {
      queryClient.setQueryData(["messages"], messages)
      setErrorNotif(dispatch, "There was an error trying to save the comment.", 5000)
    }
  })

  const sendMessage = async () => {
    messageMutation.mutate({ comment, blogId, messages: messages.data })
    setComment("")
  }

  if (blogs.isLoading || messages.isLoading) {
    return <div>Loading blog data...</div>
  }

  const blogData = blogs ? blogs.data.find(item => item.id === match.params.id) : null;

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        {blogData.title}
      </Typography>

      <Link href={blogData.url} underline="hover">
        <Typography variant="body1">
          {blogData.url}
        </Typography>
      </Link>

      <Box sx={{ pt: 2, pb: 2 }}>
        <Typography variant="body1">
          {blogData.likes} likes
        </Typography>
        <Button variant="contained" onClick={() => updateLikes(blogData, blogs.data)}>
          like
        </Button>
      </Box>

      <Box sx={{ pt: 2, pb: 2 }}>
        <Typography variant="body1">added by <strong>{blogData.author}</strong></Typography>
      </Box>

      <Button variant="contained" color="error" onClick={() => handleDelete(blogData)}>
        delete blog
      </Button>

      <Box sx={{ pt: 4 }}>
        <Typography variant="h6" component="h4">
          Comments
        </Typography>

        {messages.data.length === 0 ? (
          <p>There are no comments in this blog.</p>
        ) : (
          <List>
            {messages.data.map(item => (
              <ListItem key={item.id}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText>
                  {item.message}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        )}

        <TextField value={comment} onChange={event => setComment(event.target.value)} />
        <Box sx={{ pt: 2 }}>
          <Button variant="contained" onClick={sendMessage}>comment</Button>
        </Box>
      </Box>
    </>
  )
}

export default BlogData