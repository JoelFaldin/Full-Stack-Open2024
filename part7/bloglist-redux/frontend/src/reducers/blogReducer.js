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
    likeBlog(state, action) {
      const id = action.payload;
      const blogToVote = state.find((blog) => blog.id === id);
      const likedBlog = {
        ...blogToVote,
        likes: blogToVote.likes + 1,
      };

      const updatedBlogs = state.map((blog) => {
        return blog.id === id ? likedBlog : blog;
      });

      return updatedBlogs;
    },
    removeBlog(state, action) {
      const id = action.payload;
      const updatedBlogs = state.filter((blog) => blog.id !== id);
      return updatedBlogs;
    },
  },
});

const { setBlogs, appendBlog, likeBlog, removeBlog } = blogSlice.actions;

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

export const addLike = (id, blogs, user, token) => {
  return async (dispatch) => {
    dispatch(likeBlog(id));

    const blogToVote = blogs.find((blog) => blog.id === id);
    const likedBlog = {
      ...blogToVote,
      likes: blogToVote.likes + 1,
    };

    try {
      await blogService.addLike(
        id,
        user,
        likedBlog.likes,
        likedBlog.author,
        likedBlog.title,
        likedBlog.url,
        token,
      );
    } catch (error) {
      throw new Error("There was a problem updating the likes.");
    }
  };
};

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    dispatch(removeBlog(id, token));

    try {
      await blogService.removeBlog(id, token);
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
};

export default blogSlice.reducer;
