import React from 'react';
import { FaUsers, FaBook, FaChalkboardTeacher, FaCalendarAlt, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../ThemeProvider';

const AdminHeroPage = () => {
  // Initialize dark mode state from the custom hook
  const { isDarkMode, toggleTheme } = useTheme();
   
  return (
    <div className={`p-6 min-h-screen w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Hero Section */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome, Admin</h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Here's an overview of your platform's performance today.</p>
        </div>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-200 rounded-full transition-colors duration-200 dark:bg-gray-800"
        >
          {isDarkMode ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-gray-600" />
          )}
        </button>
      </header>

      {/* Analytics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Students */}
        <div className={` shadow-lg rounded-lg p-6 flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaUsers className="text-4xl text-blue-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Total Students</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>1,200</p>
          </div>
        </div>

        {/* Total Teachers */}
        <div className={`shadow-lg rounded-lg p-6 flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaChalkboardTeacher className="text-4xl text-green-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Total Teachers</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>85</p>
          </div>
        </div>

        {/* Courses */}
        <div className={` shadow-lg rounded-lg p-6 flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaBook className="text-4xl text-purple-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Courses</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>50</p>
          </div>
        </div>

        {/* Classes Scheduled */}
        <div className={` shadow-lg rounded-lg p-6 flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaCalendarAlt className="text-4xl text-yellow-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Classes Scheduled</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>30 Today</p>
          </div>
        </div>
      </section>

      {/* Recent Activities or Quick Actions */}
      <section className={` shadow-lg rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="text-2xl font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-4">
          <li className="flex items-center">
            <div className="p-4 bg-blue-500 text-white rounded-full mr-4">
              <FaUsers />
            </div>
            <div>
              <p className="font-semibold">New Student Enrolled</p>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>5 minutes ago</p>
            </div>
          </li>
          <li className="flex items-center">
            <div className="p-4 bg-green-500 text-white rounded-full mr-4">
              <FaChalkboardTeacher />
            </div>
            <div>
              <p className="font-semibold">New Teacher Registered</p>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>10 minutes ago</p>
            </div>
          </li>
          <li className="flex items-center">
            <div className="p-4 bg-purple-500 text-white rounded-full mr-4">
              <FaBook />
            </div>
            <div>
              <p className="font-semibold">Course Updated</p>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>1 hour ago</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AdminHeroPage;
