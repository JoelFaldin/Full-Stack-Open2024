import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext(null)

const initialState = {
  success: null,
  error: null
}

const notifReducer = (state, action) => {
  switch (action.type) {
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    case "CLEAR_SUCCESS":
      return { ...state, success: null };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notifReducer, initialState)

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)