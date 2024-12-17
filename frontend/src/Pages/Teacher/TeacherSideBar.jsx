import React, { useState } from 'react';
import { FaBook, FaVideo, FaClipboardList, FaChartLine, FaComments, FaQuestionCircle, FaUpload, FaUserCog, FaCogs, FaSignOutAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

export const TeacherSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false); // State to toggle "Create & Manage Courses"
  const [isAssignmentsOpen, setIsAssignmentsOpen] = useState(false); // State to toggle "Assignments"
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate(); // For navigation

  const handleLogout = () => {
    // Clear any session or authentication data here, if applicable
    localStorage.removeItem('authToken'); // Example for clearing authToken
    navigate('/login'); // Use navigate instead of history.push
  };

  const toggleCourses = () => {
    setIsCoursesOpen(!isCoursesOpen);
  };

  const toggleAssignments = () => {
    setIsAssignmentsOpen(!isAssignmentsOpen);
  };

  return (
    <div className={`min-h-screen shadow-lg fixed z-40 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} ${isOpen ? 'w-64' : 'w-20'} transition-all`}>
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
          <a
            href="#create-manage-courses"
            onClick={toggleCourses} // Toggle course management
            className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg"
          >
            <FaBook className="mr-4" />
            {isOpen && 'Create & Manage Courses'}
            <span className="ml-auto">{isCoursesOpen ? <FaMinus /> : <FaPlus />}</span>
          </a>
          {isCoursesOpen && (
            <ul className="ml-10 space-y-2"> {/* Nested list for "Create & Manage Courses" */}
              <li>
                <a href="/admin-teacher-add-course" className="hover:text-blue-500 font-medium">
                  Add New Course
                </a>
              </li>
              {/* New child item: Add Video */}
              <li>
                <a href="/admin-teacher-add-video" className="hover:text-blue-500 font-medium">
                  Add Video
                </a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a
            href="#courses"
            onClick={toggleAssignments} // Toggle "Assignments"
            className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg"
          >
            <FaClipboardList className="mr-4" />
            {isOpen && 'Assignments'}
            <span className="ml-auto">{isAssignmentsOpen ? <FaMinus /> : <FaPlus />}</span>
          </a>
          {isAssignmentsOpen && (
            <ul className="ml-6 space-y-2"> {/* Nested list for "Assignments" */}
              <li>
                <a
                  href="/assignment-dashboard"
                  className="flex items-center p-4 hover:bg-gray-500 rounded font-medium "
                >
                   Assignment Dashboard
                </a>
              </li>
              
            </ul>
          )}
        </li>
        <li>
          <a href="#add-video" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaClipboardList className="mr-4" />
            {isOpen && 'Grade Assignments'}
          </a>
        </li>
        <li>
          <a href="/manage-students" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaUserCog className="mr-4" />
            {isOpen && 'Manage Students'}
          </a>
        </li>
        <li>
          <a href="/manage-notes" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaChartLine className="mr-4" />
            {isOpen && 'Manage Notes'}
          </a>
        </li>
        <li>
          <a href="/admin-teacher-add-video" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaVideo className="mr-4" />
            {isOpen && 'Live Classes'}
          </a>
        </li>
        <li>
          <a href="#inquiry" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaQuestionCircle className="mr-4" />
            {isOpen && 'Discussions & Feedback'}
          </a>
        </li>
        <li>
          <a href="#admin" className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg">
            <FaUpload className="mr-4" />
            {isOpen && 'Upload Resources'}
          </a>
        </li>
      </ul>
      {/* Logout button */}
      <div className="mt-auto p-4 flex justify-between gap-4">
        <button
          onClick={toggleTheme}
          className=" bg-blue-500 text-white p-2 rounded-full"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-4 hover:bg-gray-600 rounded font-semibold text-lg text-red-500"
        >
          <FaSignOutAlt className="mr-4" />
          {isOpen && 'Logout'}
        </button>
      </div>
    </div>
  );
};
