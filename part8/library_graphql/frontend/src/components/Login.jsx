import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { PropTypes } from "prop-types"

import { LOGIN } from "../queries"

const Login = ({ setToken, alertUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      alertUser(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem('user-token', token)
      setToken(token)
    }
  }, [result.data, setToken])

  const submit = (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password <input
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  alertUser: PropTypes.func.isRequired
}