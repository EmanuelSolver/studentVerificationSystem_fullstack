import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextProvider } from './context/usercontext/context.jsx'
import { UIContextProvider } from './context/portalcontext/context.jsx'
import { AdminContextProvider } from './context/adminContext/context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <ContextProvider>
     <UIContextProvider>
      <AdminContextProvider>
          <App />
      </AdminContextProvider>
       
     </UIContextProvider>
   
    </ContextProvider>
  
  </React.StrictMode>,
)
