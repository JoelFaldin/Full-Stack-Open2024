import { useState } from "react"
import loginService from "../services/login"
import PropTypes from "prop-types"
import { useMutation } from "@tanstack/react-query"
import { setErrorNotif, setSuccessNotif } from "../actions/notificationActions"
import { setUserData } from "../actions/authActions"

const Login = ({ dispatch, authDispatch }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const authMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (response) => {
      setUserData(authDispatch, { name: response.name, username: response.username, token: response.token })
      window.localStorage.setItem("loggedUser", JSON.stringify(response))

      setSuccessNotif(dispatch, response.message, 5000)
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
      <h1>Log in the app</h1>
      <form>
        <div>
          <label htmlFor="username" id="username-label">Username:</label>
          <input
            id="username"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" id="password-label">Password:</label>
          <input
            id="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={(event) => handleSubmit(event)}
        >
          Log in
        </button>

      </form>
    </>
  )
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authDispatch: PropTypes.func.isRequired,
}

export default Login