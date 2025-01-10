import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { jokesFetching } from './services/services'
import axios, { AxiosError } from 'axios'
import { Button } from './components/ui/button'
import { Outlet } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import { toast } from "sonner"

function App() {





  return (
    <div className='w-full'>
  <Outlet />
  <Toaster position="top-right" richColors/>
    </div>
  )
}

export default App
