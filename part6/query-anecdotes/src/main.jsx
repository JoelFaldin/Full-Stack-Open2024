import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotifContextProvider } from './context/NotifContext'

import App from './App'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotifContextProvider>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </NotifContextProvider>
)