import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Landing from './pages/Landing.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/Dashboard.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Create from './pages/Create.jsx'
import Drawer from './components/Drawer';
import CDPreview from './pages/CDPreview.jsx'
import Edit from './pages/Edit';
const router = createBrowserRouter([
  {
    path:"/landing",
    element:<Landing/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:"/public/:id",
    element:<CDPreview/>
  },
  {
    path: "/",
    element: <Drawer/>, //rendering app component
    //our aim: agar user logged in nahi h then it should land on landing page.
    children:[
      {
        index:true,
        element:<Dashboard/>
      },
      {
        path:'/create',
        element:<Create/>
      },
      {
        path:'/:id',
        element:<CDPreview/>
      },
      {
        path:'edit/:id',
        element:<Edit/>
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
