import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import { useLocation } from 'react-router-dom';
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
      className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}
    >
     
      <div className="w-1/4 min-w-[250px]">
        <StudentSideBar />
      </div>

     
      <div className="flex-1 p-6 w-full lg:mx-12 ml-0">        
        <div className="flex justify-start items-start w-full mt-5 p-2">
        <div className="flex items-center bg-white shadow-md rounded-md p-3 w-full max-w-xl">
          <FaSearch className="text-gray-500 mr-3 text-2xl" /> 
          <input
            type="text"
            placeholder="Search My Courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none bg-transparent w-full text-lg" 
          />
        </div>
      </div>

       
        <div className="flex justify-start gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-md font-semibold ${
              isDarkMode
                ? 'bg-blue-500 text-white hover:bg-blue-400'
                : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
            onClick={handleSortByAlphabet}
          >
            Sort by Alphabet
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold ${
              isDarkMode
                ? 'bg-blue-500 text-white hover:bg-blue-400'
                : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
            onClick={handleSortByDate}
          >
            Sort by Date
          </button>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                src={course.image}
                alt={`${course.courseName}`}
                className="w-full h-72 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{course.courseName}</h2>
              <div
              className="text-sm mb-4 text-ellipsis overflow-hidden line-clamp-4"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
              <div className="text-sm flex justify-between mb-4">
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

       
        {filteredCourses.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
