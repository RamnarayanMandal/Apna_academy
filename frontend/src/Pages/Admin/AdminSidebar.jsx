import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../ThemeProvider';
import {
  FaTachometerAlt,
  FaUsers,
  FaBook,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaChartBar,
  FaBell,
  FaCogs,
  FaSignOutAlt,
  FaUserGraduate,
} from 'react-icons/fa';
import { logout } from '../../Component/Logout';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();


  // Menu toggle states
  const [menuState, setMenuState] = useState({
    manageUsers: false,
    courses: false,
    classes: false,
    reports: false,
    notifications: false,
    settings: false,
  });

  const handleMenuToggle = (menu) => {
    setMenuState((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const handleLogout = async() => {

    try {
      await logout();
      navigate('/login'); 
      
    } catch (error) {
        console.error('Error logging out:', error);
  
    }
  };

  return (
    <div
      className={`min-h-screen fixed z-40 shadow-lg flex flex-col transition-all ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } ${isOpen ? 'w-64' : 'w-20'}`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center p-4">
        <h2
          className={`text-xl font-extrabold ${isOpen ? 'block' : 'hidden'
            } font-sans tracking-wide`}
        >
          Admin Dashboard
        </h2>
        <button
          className="p-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          onClick={() => setIsOpen(!isOpen)}
          title="Toggle Sidebar"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>

      {/* Sidebar Menu */}
      <ul className="space-y-4">
        {/* Dashboard */}
        <li>
          <a
            href="/admin-dashboard"
            className="flex items-center p-4 hover:bg-gray-600 rounded font-semibold text-lg"
            title="Dashboard"
          >
            <FaTachometerAlt className="mr-4" />
            {isOpen && 'Dashboard'}
          </a>
        </li>

        {/* Manage Users */}
        <li>
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-600 rounded font-semibold text-lg cursor-pointer"
            onClick={() => handleMenuToggle('manageUsers')}
          >
            <div className="flex items-center">
              <FaUsers className="mr-4" />
              {isOpen && 'Manage Users'}
            </div>
            {isOpen && <span>{menuState.manageUsers ? '-' : '+'}</span>}
          </div>
          {menuState.manageUsers && isOpen && (
            <ul className="pl-8 space-y-2">
              <li>
                <a href="/manage-teachers" className="hover:text-blue-500">
                  Teachers
                </a>
              </li>
              <li>
                <a href="/manage-students" className="hover:text-blue-500">
                  Students
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* Courses */}
        <li>
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-600 rounded font-semibold text-lg cursor-pointer"
            onClick={() => handleMenuToggle('courses')}
          >
            <div className="flex items-center">
              <FaBook className="mr-4" />
              {isOpen && 'Courses'}
            </div>
            {isOpen && <span>{menuState.courses ? '-' : '+'}</span>}
          </div>
          {menuState.courses && isOpen && (
            <ul className="pl-8 space-y-2">
              <li>
                <a href="/admin-teacher-add-course" className="hover:text-blue-500">
                  Add New Course
                </a>
              </li>
              <li>
                <a href="/admin-assign-teacher" className="hover:text-blue-500">
                  Assign Teachers
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* Classes */}
        <li>
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-600 rounded font-semibold text-lg cursor-pointer"
            onClick={() => handleMenuToggle('classes')}
          >
            <div className="flex items-center">
              <FaChalkboardTeacher className="mr-4" />
              {isOpen && 'Classes'}
            </div>
            {isOpen && <span>{menuState.classes ? '-' : '+'}</span>}
          </div>
          {menuState.classes && isOpen && (
            <ul className="pl-8 space-y-2">
              <li>
                <a href="#schedule-classes" className="hover:text-blue-500">
                  Schedule Classes
                </a>
              </li>
              <li>
                <a href="#monitor-attendance" className="hover:text-blue-500">
                  Monitor Attendance
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* Reports */}
        <li>
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-600 rounded font-semibold text-lg cursor-pointer"
            onClick={() => handleMenuToggle('reports')}
          >
            <div className="flex items-center">
              <FaChartBar className="mr-4" />
              {isOpen && 'Reports'}
            </div>
            {isOpen && <span>{menuState.reports ? '-' : '+'}</span>}
          </div>
          {menuState.reports && isOpen && (
            <ul className="pl-8 space-y-2">
              <li>
                <a href="#student-performance" className="hover:text-blue-500">
                  Student Performance
                </a>
              </li>
              <li>
                <a href="#teacher-reports" className="hover:text-blue-500">
                  Teacher Reports
                </a>
              </li>
              <li>
                <a href="#course-progress" className="hover:text-blue-500">
                  Course Progress
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* Notifications */}
        <li>
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-600 rounded font-semibold text-lg cursor-pointer"
            onClick={() => handleMenuToggle('notifications')}
          >
            <div className="flex items-center">
              <FaBell className="mr-4" />
              {isOpen && 'Notifications'}
            </div>
            {isOpen && <span>{menuState.notifications ? '-' : '+'}</span>}
          </div>
          {menuState.notifications && isOpen && (
            <ul className="pl-8 space-y-2">
               <li>
                <a href="/get-announcement" className="hover:text-blue-500">
                  View Notifications
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* Settings */}
        <li>
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-600 rounded font-semibold text-lg cursor-pointer"
            onClick={() => handleMenuToggle('settings')}
          >
            <div className="flex items-center">
              <FaCogs className="mr-4" />
              {isOpen && 'Settings'}
            </div>
            {isOpen && <span>{menuState.settings ? '-' : '+'}</span>}
          </div>
          {menuState.settings && isOpen && (
            <ul className="pl-8 space-y-2">
              <li>
                <a href="#app-config" className="hover:text-blue-500">
                  App Configuration
                </a>
              </li>
              <li>
                <a href="#permissions" className="hover:text-blue-500">
                  Permissions
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>

      {/* Footer Section */}
      <div className="mt-auto p-4 flex  items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full  bg-blue-500 text-white hover:bg-blue-600"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
        {/* Logout Button */}
        {
          isOpen && (
            <button
              onClick={handleLogout}
              className="p-2 px-4 rounded-full bg-red-500 text-white hover:bg-red-600 flex items-center"
              title="Logout"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          )
        }

      </div>
    </div>
  );
};

export default AdminSidebar;
