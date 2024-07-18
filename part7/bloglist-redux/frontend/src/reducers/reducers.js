import { combineReducers } from "redux";

import notificationReducer from "./notificationReducer";
import errNotifReducer from "./errNotifReducer";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";
import userDataReducer from "./userDataReducer";
import userBlogsReducer from "./userBlogsReducer";

const rootReducer = combineReducers({
  notification: notificationReducer,
  errNotification: errNotifReducer,
  blogs: blogReducer,
  user: userReducer,
  userData: userDataReducer,
  userBlogs: userBlogsReducer,
});

export default rootReducer;
