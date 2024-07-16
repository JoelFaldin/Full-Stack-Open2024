import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { NotificationProvider } from "./context/notificationContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>
)