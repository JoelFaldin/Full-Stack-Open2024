export const setUserData = (dispatch, data) => {
  dispatch({ type: "SET", payload: data });
};

export const clearUserData = (dispatch) => {
  dispatch({ type: "CLEAR" });
};
