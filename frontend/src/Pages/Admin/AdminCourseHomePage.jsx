import React from 'react'
import { useTheme } from '../../ThemeProvider';
import AdminSidebar from './AdminSidebar';
import GetAllCourse from '../Courses/GetAllCourse';

export const AdminCourseHomePage = () => {
    const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex   ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors`}>
    <AdminSidebar  />
    <GetAllCourse/>
  </div>
  )
}
