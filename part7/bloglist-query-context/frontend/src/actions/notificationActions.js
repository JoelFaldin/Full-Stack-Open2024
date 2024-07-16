export const setSuccessNotif = (dispatch, message, time) => {
  dispatch({ type: "SET_SUCCESS", payload: message });

  setTimeout(() => {
    dispatch({ type: "CLEAR_SUCCESS" });
  }, time);
};

export const setErrorNotif = (dispatch, message, time) => {
  dispatch({ type: "SET_ERROR", payload: message });

  setTimeout(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, time);
};
