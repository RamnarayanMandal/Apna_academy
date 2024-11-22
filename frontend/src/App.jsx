import React from 'react'
import './App.css'
import { Home } from './Pages/Home/Home'
import { ThemeProvider } from './ThemeProvider'
import SRegistration from './Pages/Student/Registration'
import Registration from './Pages/Teacher/Registration'
import Login from './Pages/Login'

function App() {


  return (
    <>
     <ThemeProvider>
    <Home/>
    {/* <Registration/> */}
    <Registration />
    <Login/>
  </ThemeProvider>
    </>
   
   
  )
}

export default App
