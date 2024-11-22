import React from 'react'
import './App.css'
import { Home } from './Pages/Home/Home'
import { ThemeProvider } from './ThemeProvider'
import SRegistration from './Pages/Student/Registration'
import Registration from './Pages/Teacher/Registration'
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TeacherDashboard } from './Pages/Teacher/TeacherDashbord'
import AdminDashbord from './Pages/Admin/AdminDashbord'
import StudentDashboard from './Pages/Student/StudentDashboard'


function App() {


  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student/registration" element={<SRegistration />} />
            <Route path="/teacher/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path='/teacher-dashboard' element={<TeacherDashboard />} />
            <Route path='/admin-dashboard' element={<AdminDashbord />} />
            <Route path='/teacher-Dashbord' element={<TeacherDashboard />} />
            <Route path='/student-dashboard' element={<StudentDashboard/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>


  )
}

export default App
