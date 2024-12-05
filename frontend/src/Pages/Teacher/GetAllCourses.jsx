import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { TeacherSideBar } from './TeacherSideBar';
import { useTheme } from '../../ThemeProvider';
import axios from 'axios';

const GetAllCourses = () => {
  const { isDarkMode, setIsDarkMode } = useTheme(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
   const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const teacherId = localStorage.getItem('CurrentUserId');

  
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/course/getCourses/${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching teacher courses:', error);
    }
  };

 
  useEffect(() => {
    fetchCourses();
      }, [teacherId]);

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 min-w-[250px]">
          <TeacherSideBar />
        </div>

        {/* Main Content */}
        <div className="w-full">
          {/* Fixed Search Bar and Add to Course Button */}
          <div
            className={`flex flex-col gap-4 items-center w-full mb-6 fixed top-0 left-0 right-0 z-10 p-4 ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
            }`}
          >
            {/* Search Bar */}
            <div className="flex items-center bg-white shadow-md rounded-md p-2 w-full max-w-md mx-auto">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search Courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none bg-transparent w-full"
              />
            </div>
             <button
              className={`mt-4 px-6 py-2 rounded-md font-semibold ${isDarkMode
                ? 'bg-blue-500 text-white hover:bg-blue-400'
                : 'bg-gray-900 text-white hover:bg-gray-700'
              }`}
              onClick={() => alert('Add to Course functionality will be added here.')}
            >
              Add Course
            </button>
          </div>

         
          <div className="pt-24"> 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className={`p-4 font-serif shadow-lg rounded-md transform transition duration-300 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-white hover:bg-blue-100 text-gray-900'
                  }`}
                >
                  <img
                    src={
                      'https://cdn.pixabay.com/photo/2023/11/29/12/29/kid-8419485_1280.jpg'
                    }
                    alt={`${course.courseName}`}
                    className="w-full h-72 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-xl font-bold mb-2">{course.courseName}</h2>                 
                  <p
                    className="text-sm mb-4 cursor-pointer"
                    onClick={toggleDarkMode} 
                  >
                    {isDarkMode ? '📘' : '📗'} {course.description}
                  </p>
                  <div className="text-sm flex justify-between mb-4">
                    <p>
                      <span className="font-semibold">Start Date:</span> {course.startingDate}
                    </p>
                    <p>
                      <span className="font-semibold">End Date:</span> {course.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {filteredCourses.length === 0 && (
              <p className="text-center text-gray-500 mt-6">No courses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAllCourses;
