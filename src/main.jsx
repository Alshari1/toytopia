import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './Components/Routes/Routes'
// import AuthProvider from './components/Providers/AuthProvider.jsx'
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Components/Providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={Routes}></RouterProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)