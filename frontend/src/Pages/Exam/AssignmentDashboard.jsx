import React, { useState, useEffect } from 'react';
import { useTheme } from '../../ThemeProvider'; // Assuming you have the ThemeProvider in your app
import { TeacherSideBar } from '../Teacher/TeacherSideBar'; // Sidebar component
import axios from 'axios';
import GetAllExam from './GetAllExam'; // Import GetAllExam component

const AssignmentDashboard = () => {
  const { isDarkMode } = useTheme(); // Get dark mode status from the ThemeProvider
  const [courses, setCourses] = useState([]); // To store courses fetched by teacherId
  const [selectedCourse, setSelectedCourse] = useState(null); 
  const [selectedCourseName, setSelectedCourseName] = useState(null); 

  const [teachersCount, setTeachersCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [examsCount, setExamsCount] = useState(0);
  const teacherId = localStorage.getItem("CurrentUserId");
  const token = localStorage.getItem('token');
  const BASE_URL = import.meta.env.VITE_API_URL; // Base URL for API

  // Fetch data for teachers, courses, and exams
  const fetchData = async () => {
    try {
      const [teachersResponse, coursesResponse, examsResponse] = await Promise.all([
        axios.get(`${BASE_URL}/api/teacher/total-teachers`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${BASE_URL}/api/course/total-course`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${BASE_URL}/api/exams/total-exams`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setTeachersCount(teachersResponse.data); // Set teachers count
      setCoursesCount(coursesResponse.data); // Set courses count
      setExamsCount(examsResponse.data); // Set exams count
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchAllCoursesOfTeacher = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/course/teacher/getAllCourses/${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data || []); // Store all fetched courses
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchAllCoursesOfTeacher(); // Fetch courses when the component mounts
  }, []);

  // Handle course selection
  const handleCourseChange = (e) => {
    const selectedCourseId = e.target.value; // Get the selected course ID
    setSelectedCourse(selectedCourseId);

    // Find the selected course name based on the ID
    const course = courses.find(course => course.id === selectedCourseId);
    setSelectedCourseName(course ? course.courseName : null); // Set the course name
  };

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      {/* Sidebar */}
      <TeacherSideBar />

      {/* Main Content Area */}
      <div
        className={`flex-1 p-6 overflow-y-auto lg:ml-64 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-900'}`}
      >
        {/* Grid Container for Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Box 1 - Teachers */}
          <div
            className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl`}
          >
            <h3 className="text-xl font-semibold mb-4">Teachers</h3>
            <p>Total number of teachers: {teachersCount}</p>
          </div>

          {/* Box 2 - Courses */}
          <div
            className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl`}
          >
            <h3 className="text-xl font-semibold mb-4">Courses</h3>
            <p>Total number of courses: {coursesCount}</p>
          </div>

          {/* Box 3 - Exams */}
          <div
            className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl`}
          >
            <h3 className="text-xl font-semibold mb-4">Exams</h3>
            <p>Total number of exams: {examsCount}</p>
          </div>
        </div>

        {/* Dropdown to Select a Course */}
        <div className="mt-8">
          <label className="text-lg font-semibold mb-2 block">Select a Course</label>
          <select
            className={`${
              isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
            } p-3 rounded-lg shadow-md w-full focus:outline-none`}
            value={selectedCourse || ''}
            onChange={handleCourseChange}
          >
            <option value="" disabled>Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>

        {/* Display Selected Course (Optional) */}
        {selectedCourse && (
          <div className="mt-4">
            <p className="text-lg">You selected course: {selectedCourseName}</p>
          </div>
        )}

        {/* Pass selectedCourse and selectedCourseName to GetAllExam Component */}
        <GetAllExam courseId={selectedCourse} courseName={selectedCourseName} />
      </div>
    </div>
  );
};

export default AssignmentDashboard;
