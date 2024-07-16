import { createSlice } from "@reduxjs/toolkit";
import { login } from "../services/login";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return null;
    },
  },
});

const { setUser, logout } = userSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const request = await login(username, password);
      const userData = {
        name: request.name,
        username: request.username,
        token: request.token,
      };
      dispatch(setUser(userData));

      return request;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
};

export const setUserData = (user) => {
  return (dispatch) => {
    dispatch(setUser(user));
  };
};

export const logOutUser = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};

export default userSlice.reducer;
