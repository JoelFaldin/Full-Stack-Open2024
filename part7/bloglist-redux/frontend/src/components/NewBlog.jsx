import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";

import { createBlog } from "../reducers/blogReducer";
import { newErrorNotif } from "../reducers/errNotifReducer";
import { newNotif } from "../reducers/notificationReducer";

const NewBlog = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createBlog(title, author, url, user.token));
      dispatch(newNotif(`Blog "${title}" was successfully added!`, 5000));

      setTitle("");
      setAuthor("");
      setUrl("");
      setIsVisible(false);
    } catch (error) {
      dispatch(newErrorNotif(error.message, 5000));
    }
  };

  return isVisible ? (
    <>
      <Typography variant="h5" component="h2">Create a new blog:</Typography>
      <form>
        <Box sx={{ paddingTop: 1 }}>
          <TextField
            label="Title"
            id="title"
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Blog title"
          />
        </Box>

        <Box sx={{ paddingTop: 1 }}>
          <TextField
            label="Author"
            id="author"
            type="text"
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="Blog author"
          />
        </Box>

        <Box sx={{ paddingTop: 1 }}>
          <TextField
            label="Url"
            id="url"
            type="text"
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Blog url"
          />
        </Box>

        <Box sx={{ paddingTop: 2 }}>
          <Button variant="contained" onClick={handleCreate}>Create</Button>
        </Box>
      </form>

      <Box sx={{ paddingTop: 2 }}>
        <Button variant="contained" color="error" onClick={() => setIsVisible(false)}>cancel</Button>
      </Box>
    </>
  ) : (
    <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
      <Button
        variant="contained"
        className="showForm"
        id="showForm"
        onClick={() => setIsVisible(true)}
      >
        new blog
      </Button>
    </Box>
  );
};

export default NewBlog;
