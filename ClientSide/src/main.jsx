import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextProvider } from './context/usercontext/context.jsx'
import { StudentContextProvider } from './context/studentContext/context.jsx'
import { AdminContextProvider } from './context/adminContext/context.jsx'
import { StaffContextProvider } from './context/staffContext/context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <ContextProvider>
      
     <StudentContextProvider>

      <AdminContextProvider>

        <StaffContextProvider>
            <App />
        </StaffContextProvider>
    
      </AdminContextProvider>
       
     </StudentContextProvider>
   
    </ContextProvider>
  
  </React.StrictMode>,
)
