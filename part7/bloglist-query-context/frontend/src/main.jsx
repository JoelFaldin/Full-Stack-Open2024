import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NotificationProvider } from "./context/notificationContext"

import App from "./App"
import "./index.css"

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </QueryClientProvider>
)