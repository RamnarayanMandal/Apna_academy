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
import AssignTeacherInCourse from './Pages/Courses/AssignTeacherIncourseTable'
import StudentMyCourses from './Pages/Student/MyCourses'
import Question from './Pages/Student/Question'
import Exams from './Pages/Student/Exams'
import StudentExamPortal from './Pages/Exam/StudentExamPortal'
import { CourseHomePage } from './Pages/Courses/CourseHomePage'
import { VideoHomePage } from './Pages/Video/VideoHomePage'
import GetCourseByID from './Pages/Courses/GetCourseByID'
import AssignmentDashboard from './Pages/Exam/AssignmentDashboard'
import MyCourseById from './Pages/Student/MyCourseById'
import VideoDetails from './Pages/Video/VideoDetails'
import GetAllQuestion from './Pages/Exam/GetAllQuestion'


function App() {


  return (
    <>
      <ThemeProvider cla>
        
        <BrowserRouter >
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
            <Route path='/admin-teacher-add-course' element={<CourseHomePage />} />      
            <Route path='/admin-assign-teacher' element={<AssignTeacherInCourse />} />
            <Route path='/admin-teacher-add-video' element={<VideoHomePage />} />
            <Route path='/admin-teacher' element={<AssignTeacherInCourse />} />
            <Route path='/admin-student' element={<AssignTeacherInCourse />} />
            <Route path='/student-mycourse' element={<StudentMyCourses/>} />
            <Route path='/student-questions/:courseId/:examId' element={<Question/>} />
            <Route path='/student-exam' element={<Exams/>} />
           {/* <Route path='/student-exam-portal/:courseId' element={<GetExamByCourse/>} />  */}
            {/* <Route path='/student-exam-portal/:courseId' element={<GetExamByCourse/>} /> */}
            <Route path='/student/courses/:id' element={<GetCourseByID />} />           
            <Route path='/assignment-dashboard' element={<AssignmentDashboard/>} />
            <Route path='/student-exam-portal/:courseId' element={<StudentExamPortal/>} />           
            <Route path='/student/courses/:id' element={<GetCourseByID />} /> 
            <Route path='/student/Mycourses/:id' element={<MyCourseById />} />
            <Route path='/video/:id' element={<VideoDetails />} />


            <Route path='/student-exam-portal/:courseId' element={<StudentExamPortal/>} /> 
            <Route path='/teacher-get-questions/:examId' element={<GetAllQuestion/>} /> 

          
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>


  )
}

export default App
