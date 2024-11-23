import React from 'react'
import { useTheme } from '../../ThemeProvider';
import AdminSidebar from './AdminSidebar';

const AdminDashbord = () => {
    const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex  items-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors`}>
    <AdminSidebar  />
    <div className="p-8  flex items-center justify-center ">
      {/* Main content of the Teacher Dashboard */}
      <h1 className="text-3xl font-extrabold mb-6">
        Welcome to the Admin Dashboard
      </h1>
      {/* Add other dashboard content here */}
    </div>
  </div>
  )
}

export default AdminDashbord