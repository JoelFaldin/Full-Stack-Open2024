import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const errNotifSlice = createSlice({
  name: "errorNotif",
  initialState,
  reducers: {
    setErrorNotif(state, action) {
      return action.payload;
    },
    removeErrorNotif() {
      return null;
    },
  },
});

const { setErrorNotif, removeErrorNotif } = errNotifSlice.actions;

export const newErrorNotif = (message, time) => {
  return (dispatch) => {
    dispatch(setErrorNotif(message.message));

    setTimeout(() => {
      dispatch(removeErrorNotif());
    }, time);
  };
};

export default errNotifSlice.reducer;
