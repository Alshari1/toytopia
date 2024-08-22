import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './Components/Routes/Routes'
// import AuthProvider from './components/Providers/AuthProvider.jsx'
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Components/Providers/AuthProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const stripePromise = loadStripe('pk_test_51PptDOGcN0rk6VWLwiVW0TZiZXQsprxVFgv96Ya41bMJuPdZXRPv2EJE5g3n9tmyluD6YpF3ZpHhGCAWPFKn4rGN00T1e3Ut8F');
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Elements stripe={stripePromise}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={Routes}></RouterProvider>
          </QueryClientProvider>
        </AuthProvider>
      </Elements>
    </HelmetProvider>
  </React.StrictMode>,
)