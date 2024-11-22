import React from 'react'
import { StudentSideBar } from './StudentSidebar';
import { useTheme } from '../../ThemeProvider'; 

const StudentDashboard = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors`}>
      <StudentSideBar  />
      <div className="p-8">
       
        <h1 className="text-3xl font-extrabold mb-6">
          Welcome to the Student Dashboard
        </h1>
        
      </div>
    </div>
  );
};

export default StudentDashboard
