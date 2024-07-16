import { useState } from "react";
import { useDispatch } from "react-redux";

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
      <h1>Log in the app</h1>
      <form>
        <div>
          <label htmlFor="username" id="username-label">
            Username:
          </label>
          <input id="username" type="text" onChange={(event) => setUsername(event.target.value)} />
        </div>

        <div>
          <label htmlFor="password" id="password-label">
            Password:
          </label>
          <input id="password" type="password" onChange={(event) => setPassword(event.target.value)} />
        </div>

        <button type="button" onClick={handleSubmit}>
          Log in
        </button>
      </form>
    </>
  );
};

export default Login;
