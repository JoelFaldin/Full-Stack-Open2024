import { combineReducers } from "redux";

import notificationReducer from "./notificationReducer";
import errNotifReducer from "./errNotifReducer";

const rootReducer = combineReducers({
  notification: notificationReducer,
  errNotification: errNotifReducer,
});

export default rootReducer;
