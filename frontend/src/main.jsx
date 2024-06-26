import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/error-page'
import Home from './components/home/Home';
import Post from "./components/pages/post"
import Articles from "./components/pages/articles"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import SignUp from './components/account/signup';
import SignIn from './components/account/signin';
// import supabase from './lib/supabase-config';



const routes = createBrowserRouter([
  {
    path: "/",
    element: <SignUp/>
  },
  {
    path: "/post",
    element: <Post/>
  },
  {
    path: "/articles/:id",
    element: <Articles/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/signin",
    element: <SignIn/>
  },
])


const queryClient = new QueryClient();
   

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    
    <RouterProvider router={routes} />
    </QueryClientProvider>
  </React.StrictMode>,
)
