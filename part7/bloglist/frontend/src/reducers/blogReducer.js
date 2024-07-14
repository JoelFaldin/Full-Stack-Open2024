import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
  },
});

const { setBlogs, appendBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (title, author, url, token) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.newBlog(title, author, url, token);
      return dispatch(appendBlog(newBlog.newblog));
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
};

export default blogSlice.reducer;
