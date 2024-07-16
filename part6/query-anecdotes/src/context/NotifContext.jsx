import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'added':
      return `New anecdote added: "${action.anecdote}"`
    case 'voted':
      return `Voted for: "${action.anecdote}"`
    case 'error':
      return `Anecdote must have 5 characters or more!`
    case 'reset':
      return ''
    default:
      return state
  }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotifContext.Provider value={[notification, notificationDispatch]}>
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </NotifContext.Provider>
  )
}

export const useNotifValue = () => {
  const notifAndDispatch = useContext(NotifContext)
  return notifAndDispatch[0]
}

export const useNotifDispatch = () => {
  const notifAndDispatch = useContext(NotifContext)
  return notifAndDispatch[1]
}