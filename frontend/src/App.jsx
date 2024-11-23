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
import Profile from './Pages/Student/Profile'
import UpdateStudent from './Pages/Student/UpdateStudent'
import { AdminCourseHomePage } from './Pages/Admin/AdminCourseHomePage'


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
            <Route path='/Teacher-Dashbord' element={<TeacherDashboard />} />
            <Route path='/Student-Dashbord' element={<StudentDashboard/>} />
            <Route path='/Student-profile/:id' element={<Profile/>} />
            <Route path='/Update-Student/:id' element={<UpdateStudent/>} />
            <Route path='/admin-dashboard' element={<AdminDashbord />} />
            <Route path='/admin-add-course' element={<AdminCourseHomePage />} />
           
          
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>


  )
}

export default App
