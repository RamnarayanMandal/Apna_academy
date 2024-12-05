import React from 'react'
import { StudentSideBar } from './StudentSidebar';
import { useTheme } from '../../ThemeProvider'; 
import GetAllCourse from './GetAllCourses';


const StudentDashboard = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex  lg:gap-20 w-full  ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'} transition-colors`}>
       <div className='fixed'>
      <StudentSideBar  />
      </div>
      <div className="ml-[260px] w-full"> {/* Adjust ml value as per sidebar width */}
        <GetAllCourse />
      </div>
      </div>
    
  );
};


export default StudentDashboard
