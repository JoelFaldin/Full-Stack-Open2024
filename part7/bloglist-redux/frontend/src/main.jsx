import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
