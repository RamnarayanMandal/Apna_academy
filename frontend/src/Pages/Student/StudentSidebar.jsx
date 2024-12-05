import React, { useState } from 'react';
import { FaChalkboardTeacher, FaTasks, FaRegGrinStars, FaBookOpen, FaUserAlt, FaSignOutAlt, FaUser  , FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

export const StudentSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);  // State to control "My Courses" collapse/expand
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate(); // For navigation
  const StudentId = localStorage.getItem('CurrentUserId');
  const handleLogout = () => {
    // Clear any session or authentication data here, if applicable
    localStorage.removeItem('authToken'); // Example for clearing authToken
    navigate('/login'); // Use navigate instead of history.push
  };

  return (
    <div className={`h-screen shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} ${isOpen ? 'w-64' : 'w-20'} transition-all`}>
      {/* <StudentSideBar/> */}
      <div className="flex justify-between items-center p-4">
        <h2 className={`text-xl font-extrabold mb-6 ${isOpen ? 'block' : 'hidden'} font-sans tracking-wide`}>
          Student Dashboard
        </h2>
        <button
          className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-2 rounded`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>
      <div className="px-4 py-6">
      <div className="flex items-center space-x-4">
        {/* Profile section */}
        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
          <span className="text-white">S</span> {/* Replace with profile picture or name */}
        </div>

        {/* Conditionally render "Student" text and make it clickable */}
        {isOpen && (          
            <span className="text-lg font-semibold cursor-pointer text-black-500 hover:underline">
              Student
            </span>         
        )}
      </div>
    </div>
      <ul className="space-y-4">
      <li>
          <a
            href="/Student-Dashbord"
            className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg"
          >
            <FaUser   className="mr-4" />
            {isOpen && 'Student Dashbord'}
          </a>
        </li>
        {/* My Courses (collapsible) */}
        <li>
          <div
            className="flex items-center p-4 cursor-pointer hover:bg-gray-600 rounded font-semibold text-lg"
            onClick={() => setIsCoursesOpen(!isCoursesOpen)} // Toggle the courses menu
          >
            <FaChalkboardTeacher className="mr-4" />
            {isOpen && 'My Courses'}
            {isCoursesOpen ? (
              <FaAngleUp className="ml-auto" />
            ) : (
              <FaAngleDown className="ml-auto" />
            )}
          </div>
          {/* Nested Courses Sections */}
          {isCoursesOpen && (
            <ul className="pl-8 space-y-2">
              <li>
                <a
                  href="/student-mycourse"
                  className="flex items-center p-3 hover:bg-gray-500 rounded font-semibold text-lg"
                >
                  {/* Icon for Enrolled Courses */}
                  <FaTasks className="mr-4" />
                  {isOpen && 'Enrolled Courses'}
                </a>
              </li>
              <li>
                <a
                  href="#courses-in-progress"
                  className="flex items-center p-3 hover:bg-gray-500 rounded font-semibold text-lg"
                >
                  {/* Icon for Courses in Progress */}
                  <FaTasks className="mr-4" />
                  {isOpen && 'Courses in Progress'}
                </a>
              </li>
              <li>
                <a
                  href="#completed-courses"
                  className="flex items-center p-3 hover:bg-gray-500 rounded font-semibold text-lg"
                >
                  {/* Icon for Completed Courses */}
                  <FaRegGrinStars className="mr-4" />
                  {isOpen && 'Completed Courses'}
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* Assignments & Exams */}
        <li>
          <a
            href="/student-exam"
            className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg"
          >
            <FaTasks className="mr-4" />
            {isOpen && 'Assignments & Exams'}
          </a>
        </li>

        {/* Grades & Progress */}
        <li>
          <a
            href="#grades-progress"
            className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg"
          >
            <FaRegGrinStars className="mr-4" />
            {isOpen && 'Grades & Progress'}
          </a>
        </li>

        {/* Study Materials / Resources */}
        <li>
          <a
            href="#study-materials"
            className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg"
          >
            <FaBookOpen className="mr-4" />
            {isOpen && 'Study Materials'}
          </a>
        </li>

        {/* Profile / Account Settings */}
        <li>
          <a
            href={`/Student-profile/${StudentId}`}
            className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg"
          >
            <FaUserAlt className="mr-4" />
            {isOpen && 'Profile / Settings'}
          </a>
        </li>

        {/* Logout button */}
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-4 hover:bg-gray-600 rounded font-semibold text-lg text-red-500"
          >
            <FaSignOutAlt className="mr-4" />
            {isOpen && 'Logout'}
          </button>
        </div>
      </ul>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute bottom-4 left-4 bg-blue-500 text-white p-2 rounded-full"
      >
        {isDarkMode ? '🌞' : '🌙'}
      </button>
    </div>
  );
};
