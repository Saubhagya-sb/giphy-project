import React, { Children } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import AppLayout from './lauout/AppLayout'
import Home from './lauout/Home'
import Categories from './lauout/Categories'
import Search from './lauout/Search'
import Singlegif from './lauout/Single-gif'
import Favourites from './lauout/Favourites'
import GifProvider from './context/GifContext'
const router = createBrowserRouter([
  {element : <AppLayout/>,
  children: [
    {
      path: "/",
      element : <Home/>
    },
    {
      path: '/:category',
      element : <Categories/>
    },
    {
      path: '/search/:query',
      element : <Search/>
    },
    {
      path: '/:type/:slug',
      element : <Singlegif/>
    },
    {
      path: '/favourites',
      element : <Favourites/>
    },
  ]}
])

function App() {
 
  return (
    <GifProvider>
      <RouterProvider router={router}/>
    </GifProvider>
    
    
  )
}

export default App
