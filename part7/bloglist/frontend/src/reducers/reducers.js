import { combineReducers } from "redux";

import notificationReducer from "./notificationReducer";
import errNotifReducer from "./errNotifReducer";
import blogReducer from "./blogReducer";

const rootReducer = combineReducers({
  notification: notificationReducer,
  errNotification: errNotifReducer,
  blogs: blogReducer,
});

export default rootReducer;
