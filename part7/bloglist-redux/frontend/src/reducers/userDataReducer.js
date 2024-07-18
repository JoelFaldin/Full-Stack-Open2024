import { createSlice } from "@reduxjs/toolkit";

import userService from "../services/users";

const initialState = null;

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setData(state, action) {
      return action.payload;
    },
  },
});

const { setData } = userDataSlice.actions;

export const setUsersData = () => {
  return async (dispatch) => {
    const request = await userService.getUserData();
    dispatch(setData(request));
  };
};

export default userDataSlice.reducer;
