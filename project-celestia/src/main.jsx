import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './components/common/Home';
import { ClerkProvider } from '@clerk/clerk-react';
import SignInComponent from './components/common/SignInComponent';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const browserRouterObj = createBrowserRouter([
  {
    path:"/",
    element: <RootLayout />,
    children:[
      {
        path:"",
        element: <Home />
      },
      {
        path:"signin",
        element: <SignInComponent />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router = {browserRouterObj} />
  </ClerkProvider>

)
