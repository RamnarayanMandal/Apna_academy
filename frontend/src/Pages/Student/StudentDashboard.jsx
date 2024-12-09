import React from 'react'
import { StudentSideBar } from './StudentSidebar';
import { useTheme } from '../../ThemeProvider';
import GetAllCourse from './GetAllCourses';


const StudentDashboard = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex  lg:gap-20 w-full  ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'} transition-colors`}>
      <div className='fixed z-50 lg:w-60'>
        <StudentSideBar />
      </div>

      <div className="w-full ">
        <GetAllCourse />
      </div>
    </div>


  );
};


export default StudentDashboard
