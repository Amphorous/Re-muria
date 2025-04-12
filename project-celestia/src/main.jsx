import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './components/common/Home';
import { ClerkProvider, SignIn } from '@clerk/clerk-react';
import SignInComponent from './components/common/Validate';
import User from './components/common/User';
import Validate from './components/common/Validate';
import RemurianContext from './contexts/RemurianContext';


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
        path:"user",
        element: <User />,
        children: [
          {
            path: "signin",
            element: <SignIn />
          },
          {
            path: "validate",
            element: <Validate />
          },
          {
            path: "",
            element: <Navigate to="signin" />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RemurianContext>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router = {browserRouterObj} />
    </ClerkProvider>
  </RemurianContext>

)
