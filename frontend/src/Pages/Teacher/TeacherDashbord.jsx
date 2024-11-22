import React from 'react';
import { TeacherSideBar } from './TeacherSideBar';
import { useTheme } from '../../ThemeProvider';  // Make sure this is correctly imported

export const TeacherDashboard = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors`}>
      <TeacherSideBar  />
      <div className="p-8">
        {/* Main content of the Teacher Dashboard */}
        <h1 className="text-3xl font-extrabold mb-6">
          Welcome to the Teacher Dashboard
        </h1>
        {/* Add other dashboard content here */}
      </div>
    </div>
  );
};
