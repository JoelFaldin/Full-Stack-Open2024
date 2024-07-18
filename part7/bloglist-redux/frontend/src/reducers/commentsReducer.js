import { createSlice } from "@reduxjs/toolkit";

import commentService from "../services/comments";

const commentsSlice = createSlice({
  name: "comments",
  initialState: null,
  reducers: {
    setComments(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.push(action.payload);
    },
  },
});

const { setComments, appendComment } = commentsSlice.actions;

export const initializeComments = (id) => {
  return async (dispatch) => {
    const comments = await commentService.getComments(id);
    dispatch(setComments(comments));
  };
};

export const submitComment = (message, blogId) => {
  return async (dispatch) => {
    try {
      const newComment = await commentService.addComment(message, blogId);
      dispatch(appendComment(newComment.comment));
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
};

export default commentsSlice.reducer;
