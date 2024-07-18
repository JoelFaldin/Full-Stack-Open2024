import { createSlice } from "@reduxjs/toolkit";

import commentService from "../services/comments";

const commentsSlice = createSlice({
  name: "comments",
  initialState: null,
  reducers: {
    setComments(state, action) {
      return action.payload;
    },
  },
});

const { setComments } = commentsSlice.actions;

export const initializeComments = (id) => {
  return async (dispatch) => {
    const comments = await commentService.getComments(id);
    dispatch(setComments(comments));
  };
};

export default commentsSlice.reducer;
