import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Home from './components/Home'

const browserRouterObj = createBrowserRouter([
  {
    path:"/",
    element: <RootLayout />,
    children:[
      {
        path:"",
        element: <Home />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router = {browserRouterObj} />,
)
