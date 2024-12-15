import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';  // Import the search icon
import { StudentSideBar } from './StudentSidebar';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing
import { useTheme } from '../../ThemeProvider';

const Exams = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');
  const studentId = localStorage.getItem('CurrentUserId'); 
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); // Initialize the navigate function
  const { isDarkMode } = useTheme();

  // Fetch all the courses the student is enrolled in
  const fetchMyCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/course/getAllCourses/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching student courses:', error);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, [studentId]);

  // Filter courses based on search term
  const filteredCourses = myCourses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle the View Exams button click
  const handleViewExams = (courseId) => {
    navigate(`/student-exam-portal/${courseId}`); // Navigate to the desired route
  };

  return (
    <div className={`min-h-screen flex lg:gap-20 w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'} transition-colors`}>
      {/* Sidebar */}
      <div className="fixed z-40">
        <StudentSideBar />
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6 w-full lg:ml-64 ml-16">
        <div className="flex justify-start items-start w-full mt-5 p-2">
          {/* Search bar with search icon */}
          <div className="flex items-center bg-white shadow-md rounded-md p-3 w-full max-w-xl">
            <FaSearch className="text-gray-500 mr-3 text-xl" />
            <input
              type="text"
              placeholder="Search Courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none bg-transparent w-full text-lg"
            />
          </div>
        </div>

        {/* Courses table */}
        <div className="overflow-x-auto mt-8">
          <table className={`min-w-full rounded-lg ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}    shadow-md`}>
            <thead className={` ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-400 text-gray-900'}`}>
              <tr>
                <th className="px-6 py-3 text-left">Course Name</th>
                <th className="px-6 py-3 text-left">Start Date</th>
                <th className="px-6 py-3 text-left">End Date</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b border-gray-300 hover:bg-gray-100">
                    <td className="px-6 py-4">{course.courseName}</td>
                    <td className="px-6 py-4">{course.startingDate}</td>
                    <td className="px-6 py-4">{course.endDate}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={() => handleViewExams(course.id)} // Trigger the navigation
                      >
                        View Exams
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Exams;
