import React from 'react'
import './App.css'
import { Home } from './Pages/Home/Home'
import { ThemeProvider } from './ThemeProvider'

function App() {


  return (
    <ThemeProvider>
    <Home/>
  </ThemeProvider>
   
  )
}

export default App
