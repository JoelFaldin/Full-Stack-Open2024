import { createSlice } from "@reduxjs/toolkit";

import userDataService from "../services/users";

const initialState = null;

const userBlogsSlice = createSlice({
  name: "userBlogs",
  initialState,
  reducers: {
    setUserBlogs(state, action) {
      return action.payload;
    },
  },
});

const { setUserBlogs } = userBlogsSlice.actions;

export const initializeUserBlogs = (id) => {
  return async (dispatch) => {
    const userBlogs = await userDataService.getUsersBlogs(id);
    dispatch(setUserBlogs(userBlogs));
  };
};

export default userBlogsSlice.reducer;
