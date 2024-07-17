import PropTypes from "prop-types"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { TextField, Box, Button, Typography } from "@mui/material"

import loginService from "../services/login"
import { setErrorNotif, setSuccessNotif } from "../actions/notificationActions"
import { setUserData } from "../actions/authActions"
import { useNavigate } from "react-router-dom"

const Login = ({ dispatch, authDispatch }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (response) => {
      setUserData(authDispatch, { name: response.name, username: response.username, token: response.token })
      window.localStorage.setItem("loggedUser", JSON.stringify(response))

      setSuccessNotif(dispatch, response.message, 5000)
      navigate("/")
    },
    onError: (error) => {
      setErrorNotif(dispatch, error.response.data.error, 5000)
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    authMutation.mutate({ username, password })
  }

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Log in the app
      </Typography>
      <form>
        <Box mb={2}>
          <TextField
            id="username"
            type="text"
            label="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </Box>

        <Box mb={2}>
          <TextField
            id="password"
            type="password"
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Box>

        <Button
          variant="contained"
          type="button"
          onClick={(event) => handleSubmit(event)}
        >
          Log in
        </Button>

      </form >
    </>
  )
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authDispatch: PropTypes.func.isRequired,
}

export default Login