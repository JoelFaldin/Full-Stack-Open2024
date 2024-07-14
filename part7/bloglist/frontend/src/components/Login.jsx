import { useState } from "react";
import loginService from "../services/login";
import PropTypes from "prop-types";

const Login = ({ userMethod, handleMessages }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const request = await loginService.login(username, password);
      window.localStorage.setItem("loggedUser", JSON.stringify(request));
      window.localStorage.setItem("loggedName", request.name);
      window.localStorage.setItem("loggedToken", request.token);
      userMethod(request.name, request.token);
      handleMessages(request, "success");
    } catch (error) {
      handleMessages(error, "error");
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
          <input id="username" type="text" onChange={handleUsername} />
        </div>

        <div>
          <label htmlFor="password" id="password-label">
            Password:
          </label>
          <input id="password" type="password" onChange={handlePassword} />
        </div>

        <button type="button" onClick={handleSubmit}>
          Log in
        </button>
      </form>
    </>
  );
};

Login.propTypes = {
  userMethod: PropTypes.func.isRequired,
  handleMessages: PropTypes.func.isRequired,
};

export default Login;
