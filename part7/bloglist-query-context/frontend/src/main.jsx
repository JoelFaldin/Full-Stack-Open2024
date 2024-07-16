import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NotificationProvider } from "./context/notificationContext"
import { AuthProvider } from "./context/AuthContext"

import App from "./App"
import "./index.css"

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <NotificationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NotificationProvider>
  </QueryClientProvider>
)