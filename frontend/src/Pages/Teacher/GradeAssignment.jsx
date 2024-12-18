import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import StudentResult from '../Student/StudentResult';
import { TeacherSideBar } from './TeacherSideBar';

const GradeAssignment = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const teacherId = localStorage.getItem('CurrentUserId');
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const fetchCoursesByTeacherId = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/course/teacher/getAllCourses/${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCoursesByTeacherId();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };
 
  const filteredCourses = courses.filter(course => 
    course.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseSelect = (event) => {
    setSelectedCourseId(event.target.value);
  };

  return (
    <div className={`flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-gradient-to-b  ">
        <TeacherSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-transparent"> {/* Ensured background is transparent here */}
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={handleBackClick}
            className={`flex items-center p-3 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300`}
          >
            <FaArrowLeft className="mr-3" />
            Back
          </button>
        </div>

        {/* Course Search and Dropdown */}
        <div className="mb-8">
          <div className="relative">
            <select
              className={`w-full p-4 border-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
              onChange={handleCourseSelect}
              value={selectedCourseId}
            >
              <option value="">Select a course</option>
              {filteredCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.courseName } {/* Ensure to use the correct field here */}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Student Results */}
        {selectedCourseId && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student Results</h2>
            <StudentResult courseId={selectedCourseId} token={token} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeAssignment;
