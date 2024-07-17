import { useEffect } from "react"
import { Routes, Route, useMatch } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import blogService from "./services/blogs"
import Login from "./components/Login"
import Home from "./components/Home"
import Users from "./components/Users"
import { useNotifContext } from "./context/notificationContext"
import { useAuthContext } from "./context/AuthContext"
import { setUserData } from "./actions/authActions"
import UserData from "./components/UserData"

const App = () => {
  const { state, dispatch } = useNotifContext();
  const { authState, authDispatch } = useAuthContext();

  useEffect(() => {
    const loggedUserJSON = JSON.parse(localStorage.getItem("loggedUser"))
    if (loggedUserJSON && loggedUserJSON.name) {
      setUserData(authDispatch, { name: loggedUserJSON.name, username: loggedUserJSON.username, token: loggedUserJSON.token })
    }
  }, [authDispatch])

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
    retry: 1
  })

  const name = authState ? authState.name : null
  const match = useMatch("/users/:id");
  const id = match ? match.params.id : null

  return (
    <>
      {authState && (
        <>
          <h2>blogs</h2>
          <p>{authState.name} logged in</p>
        </>
      )}
      <div>
        {state.error && (
          <div className='errorMessage'>
            <p className='text'>{state.error}</p>
          </div>
        )}

        <Routes>
          <Route path="/" element={authState ? <Home result={result} state={state} dispatch={dispatch} authState={authState} authDispatch={authDispatch} /> : <Login dispatch={dispatch} authDispatch={authDispatch} />} />
          <Route path="/login" element={<Login dispatch={dispatch} authDispatch={authDispatch} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserData userId={id} name={name} />} />
        </Routes>

        {state.success && (
          <div className='message'>
            <p className='text'>{state.success}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App