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
import Dashboard from './components/common/Dashboard';
import Builds from './components/common/Builds';
import Coming from './components/common/Coming';


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
        path:"dashboard/:uid",
        element: <Dashboard />
      },
      {
        path:"builds/:uid",
        element: <Builds />
      },
      {
        path:"leaderboards",
        element: <Coming />
      },
      {
        path:"artifacts/:uid",
        element: <Coming />
      },
      {
        path:"leaderboards",
        element: <Coming />
      },
      {
        path:"settings",
        element: <Coming />
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