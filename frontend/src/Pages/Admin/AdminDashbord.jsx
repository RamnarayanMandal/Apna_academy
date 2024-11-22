import React from 'react'
import { useTheme } from '../../ThemeProvider';
import AdminSidebar from './AdminSidebar';
import AdminHeroPage from './AdminHeroPage';

const AdminDashbord = () => {
    const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex   ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors`}>
    <AdminSidebar  />
    <AdminHeroPage/>
  </div>
  )
}

export default AdminDashbord