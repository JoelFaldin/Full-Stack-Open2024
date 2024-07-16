import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notifSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotif(state, action) {
      return action.payload;
    },
    removeNotif() {
      return null;
    },
  },
});

const { setNotif, removeNotif } = notifSlice.actions;

export const newNotif = (message, time) => {
  return (dispatch) => {
    dispatch(setNotif(message));

    setTimeout(() => {
      dispatch(removeNotif());
    }, time);
  };
};

export default notifSlice.reducer;
