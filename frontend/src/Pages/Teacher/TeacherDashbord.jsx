import React from 'react';
import { TeacherSideBar } from './TeacherSideBar';
import { useTheme } from '../../ThemeProvider';  // Make sure this is correctly imported
import GetAllCourse from '../Courses/GetAllCourse';

export const TeacherDashboard = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex  lg:gap-20 w-full  ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'} transition-colors`}>
       <div>
        <TeacherSideBar  />
       </div>
      <GetAllCourse/>
      </div>
    
  );
};
