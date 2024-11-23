import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const MyCourses = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [myCourses, setMyCourses] = useState([]);
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const studentId = localStorage.getItem('studentId'); // Assuming the student ID is saved in localStorage

  // Fetch the courses for the logged-in student
  const fetchMyCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/course/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching student courses:', error);
    }
  };

  // Delete Course
  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyCourses(myCourses.filter((course) => course.id !== id));
      alert('Course deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  // Sorting Functions
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

  // Filter Courses Based on Search Term
  const filteredCourses = myCourses.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchMyCourses();
  }, [studentId]);

  return (
    <div
      id="MyCourses"
      className={`p-6 w-full lg:mx-20 ml-20 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
      }`}
    >
      {/* Search and Add Button */}
      <div className="flex justify-between items-center w-full mb-6">
        <div className="flex items-center bg-white shadow-md rounded-md p-2 w-auto">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search My Courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none bg-transparent w-full"
          />
        </div>
      </div>

      {/* Sort Buttons */}
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

      {/* Course List */}
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
            <p className="text-sm mb-4">
              {isDarkMode ? '📘' : '📗'} {course.description}
            </p>
            <div className="text-sm flex justify-between mb-4">
              <p>
                <span className="font-semibold">Start Date:</span>{' '}
                {course.startingDate}
              </p>
              <p>
                <span className="font-semibold">End Date:</span> {course.endDate}
              </p>
            </div>
            <div className="flex justify-between">
              <button
                className={`px-4 py-2 rounded-md font-semibold ${
                  isDarkMode
                    ? 'border-white text-white hover:bg-white hover:text-gray-900'
                    : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                }`}
                onClick={() => alert(`Update ${course.courseName}`)}
              >
                Update
              </button>
              <button
                className={`px-4 py-2 rounded-md font-semibold ${
                  isDarkMode
                    ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                    : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                }`}
                onClick={() => handleDeleteCourse(course.id)}
              >
                Delete
              </button>
              <button
                className={`px-4 py-2 rounded-md font-semibold ${
                  isDarkMode
                    ? 'bg-blue-500 text-white hover:bg-blue-400'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
                onClick={() => alert(`Explore ${course.courseName}`)}
              >
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Courses Found */}
      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No courses found.</p>
      )}
    </div>
  );
};

export default MyCourses;
