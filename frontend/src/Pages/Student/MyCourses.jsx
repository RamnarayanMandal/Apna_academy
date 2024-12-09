import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StudentSideBar } from './StudentSidebar';

const MyCourses = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [myCourses, setMyCourses] = useState([]);
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const studentId = localStorage.getItem('CurrentUserId');
  const navigate = useNavigate(); // Initialize the navigate function

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

  const handleSortByAlphabet = () => {
    const sortedCourses = [...myCourses].sort((a, b) =>
      a.courseName.localeCompare(b.courseName)
    );
    setMyCourses(sortedCourses);
  };

  const handleSortByDate = () => {
    const sortedCourses = [...myCourses].sort(
      (a, b) => new Date(a.startingDate) - new Date(b.startingDate)
    );
    setMyCourses(sortedCourses);
  };

  const filteredCourses = myCourses.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchMyCourses();
  }, [studentId]);

  

  return (
    <div
      id="MyCourses"
      className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      <div className="fixed z-40">
        <StudentSideBar />
      </div>

      <div className='lg:ml-72 ml-24 mt-20 w-full'>
        {/* Search Bar */}
        <div className="flex items-center bg-white shadow-md rounded-md p-3 w-[90%]  mb-6">
          <FaSearch className="text-gray-500 mr-3 text-2xl" />
          <input
            type="text"
            placeholder="Search My Courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none bg-transparent w-full text-lg text-gray-900"
          />
        </div>

        {/* Sorting Buttons */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleSortByAlphabet}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sort by Name
          </button>
          <button
            onClick={handleSortByDate}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            Sort by Date
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`p-5 font-serif shadow-xl cursor-pointer rounded-lg transform transition duration-300 hover:scale-105 ${isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-white hover:bg-blue-100 text-gray-900'
                }`}
             onClick={()=>{
              navigate(`/student/Mycourses/${course.id}`, { replace: true }); 

             }}>
              <img
                src={course.image}
                alt={`${course.courseName}`}
                className="w-full h-60 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{course.courseName}</h2>
              <div
                className="text-sm mb-4 text-ellipsis overflow-hidden line-clamp-4"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
              <div className="text-sm flex justify-between">
                <p>
                  <span className="font-semibold">Start Date:</span>{' '}
                  {course.startingDate}
                </p>
                <p>
                  <span className="font-semibold">End Date:</span> {course.endDate}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* No courses found message */}
        {filteredCourses.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
