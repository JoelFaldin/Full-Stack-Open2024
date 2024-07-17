import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"

import { NotificationProvider } from "./context/notificationContext"
import { AuthProvider } from "./context/AuthContext"

import App from "./App"
import "./index.css"

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </NotificationProvider>
  </QueryClientProvider>
)