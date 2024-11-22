import React, { useState } from 'react';
import { FaBook, FaVideo, FaClipboardList, FaChartLine, FaComments, FaQuestionCircle, FaUserCog, FaCogs, FaSignOutAlt } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

export const TeacherSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate(); // For navigation

  const handleLogout = () => {
    // Clear any session or authentication data here, if applicable
    localStorage.removeItem('authToken'); // Example for clearing authToken
    navigate('/login'); // Use navigate instead of history.push
  };

  return (
    <div className={`h-screen shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} ${isOpen ? 'w-64' : 'w-20'} transition-all`}>
      <div className="flex justify-between items-center p-4">
        <h2 className={`text-xl font-extrabold mb-6 ${isOpen ? 'block' : 'hidden'} font-sans tracking-wide`}>
          Teacher Dashboard
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
            <span className="text-white">T</span> {/* Replace with profile picture or name */}
          </div>
          {isOpen && <span className="text-lg font-semibold">Teacher</span>}
        </div>
      </div>
      <ul className="space-y-4">
        <li>
          <a href="#make-notes" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaBook className="mr-4" />
            {isOpen && 'Make Notes'}
          </a>
        </li>
        <li>
          <a href="#courses" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaClipboardList className="mr-4" />
            {isOpen && 'Courses'}
          </a>
        </li>
        <li>
          <a href="#add-video" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaVideo className="mr-4" />
            {isOpen && 'Add Video'}
          </a>
        </li>
        <li>
          <a href="#assign" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaClipboardList className="mr-4" />
            {isOpen && 'Assign Work'}
          </a>
        </li>
        <li>
          <a href="#check-results" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaChartLine className="mr-4" />
            {isOpen && 'Check Results'}
          </a>
        </li>
        <li>
          <a href="#feedback" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaComments className="mr-4" />
            {isOpen && 'Student Feedback'}
          </a>
        </li>
        <li>
          <a href="#inquiry" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaQuestionCircle className="mr-4" />
            {isOpen && 'Student Inquiry'}
          </a>
        </li>
        <li>
          <a href="#admin" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaUserCog className="mr-4" />
            {isOpen && 'Admin'}
          </a>
        </li>
        <li>
          <a href="#administration" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaCogs className="mr-4" />
            {isOpen && 'Administration'}
          </a>
        </li>
      </ul>
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
      <button
        onClick={toggleTheme}
        className="absolute bottom-4 left-4 bg-blue-500 text-white p-2 rounded-full"
      >
        {isDarkMode ? '🌞' : '🌙'}
      </button>
    </div>
  );
};
