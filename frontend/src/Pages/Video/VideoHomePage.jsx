import React from 'react';
import { useTheme } from '../../ThemeProvider';
import { TeacherSideBar } from '../Teacher/TeacherSideBar';
import AdminSidebar from '../Admin/AdminSidebar';
import GetAllVideos from './GetAllVideoes';


export const VideoHomePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const role = localStorage.getItem('role'); // Get the role from localStorage

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors`}>    
      {role === 'teacher' ? <TeacherSideBar /> : role === 'admin' ? <AdminSidebar /> : null}        
     <GetAllVideos/>
    </div>
  );
};
