import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Login from "./components/Login"
import Home from "./components/Home"
import Users from "./components/Users"
import { useNotifContext } from "./context/notificationContext"
import { useAuthContext } from "./context/AuthContext"
import { setUserData } from "./actions/authActions"

const App = () => {
  const { state, dispatch } = useNotifContext();
  const { authState, authDispatch } = useAuthContext();

  useEffect(() => {
    const loggedUserJSON = JSON.parse(localStorage.getItem("loggedUser"))
    if (loggedUserJSON && loggedUserJSON.name) {
      setUserData(authDispatch, { name: loggedUserJSON.name, username: loggedUserJSON.username, token: loggedUserJSON.token })
    }
  }, [authDispatch])

  return (
    <Router>
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
          <Route path="/" element={authState ? <Home state={state} dispatch={dispatch} authState={authState} authDispatch={authDispatch} /> : <Login dispatch={dispatch} authDispatch={authDispatch} />} />
          <Route path="/login" element={<Login dispatch={dispatch} authDispatch={authDispatch} />} />
          <Route path="/users" element={<Users />} />
        </Routes>

        {state.success && (
          <div className='message'>
            <p className='text'>{state.success}</p>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App