import { combineReducers } from "redux";

import notificationReducer from "./notificationReducer";
import errNotifReducer from "./errNotifReducer";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  notification: notificationReducer,
  errNotification: errNotifReducer,
  blogs: blogReducer,
  user: userReducer,
});

export default rootReducer;