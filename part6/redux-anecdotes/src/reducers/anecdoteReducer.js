import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";
import { setNotification, removeNotification } from "./notificationReducer";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const data = action.payload;
      state.push({
        content: data.content,
        id: data.id,
        votes: 0,
      });
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      const updatedState = state.map((anecdote) =>
        anecdote.id === id ? updatedAnecdote : anecdote
      );
      return [...updatedState].sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getData();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    return dispatch(appendAnecdote(newAnecdote));
  };
};

export const addVote = (id, anecdotes) => {
  return async (dispatch) => {
    dispatch(voteAnecdote(id));

    const anecdoteToVote = anecdotes.find((anecdote) => anecdote.id === id);
    const updatedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    };

    await anecdoteService.voteAnecdote(id, updatedAnecdote);
  };
};

export const newNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time);
  };
};

export default anecdoteSlice.reducer;
