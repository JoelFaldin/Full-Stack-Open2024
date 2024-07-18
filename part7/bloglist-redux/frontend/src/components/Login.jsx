import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material"

import { loginUser } from "../reducers/userReducer";
import { newNotif } from "../reducers/notificationReducer";
import { newErrorNotif } from "../reducers/errNotifReducer";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const request = await dispatch(loginUser(username, password));

      window.localStorage.setItem("loggedUser", JSON.stringify(request));
      dispatch(newNotif(request.message, 5000));
    } catch (error) {
      dispatch(newErrorNotif(error, 5000))
    }
  };

  return (
    <>
      <Typography variant="h4" component="h2">Log in the app</Typography>
      <form>
        <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <TextField label="Username" type="text" onChange={(event) => setUsername(event.target.value)} />
        </Box>

        <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <TextField label="password" type="password" onChange={(event) => setPassword(event.target.value)} />
        </Box>

        <Button variant="contained" type="button" onClick={handleSubmit}>
          Log in
        </Button>
      </form>
    </>
  );
};

export default Login;
