import React, { useState, useEffect } from 'react';
import { FaHouseUser, FaSignOutAlt, FaAngleLeft, FaAngleRight, FaFolderOpen, FaBars } from 'react-icons/fa';
import { PiUsersFourBold } from 'react-icons/pi';
import { GiSkills } from "react-icons/gi";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logo, setLogo] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const URI = import.meta.env.VITE_API_URL;
  
  const email = localStorage.getItem("email");
  const [userProfile, setUserProfile] = useState({ email });

  const toggleSidebar = () => setIsOpen(!isOpen);

  let logoId;
  if (logo.length > 0) {
    logoId = logo[0]._id;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login-ramnarayanMandal');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getLogo = async () => {
    try {
      const resp = await axios.get(`${URI}/api/logo/`);
      setLogo(resp.data);
    } catch (error) {
      console.error('Error fetching logo:', error);
      Swal.fire('Error', 'Unable to fetch logo!', 'error');
    }
  };

  useEffect(() => {
    getLogo();
  }, []);

  const menuItems = [
    { label: 'Student Dashboard', icon: <FaHouseUser />, route: '/dashboard' }, // New Dashboard item
    { label: 'Batch', icon: <FaHouseUser />, route: '/batch' },
    { label: 'Course', icon: <GiSkills />, route: '/course' },
    { label: 'Contact', icon: <PiUsersFourBold />, route: '/contact' },
    { label: 'Logout', icon: <FaSignOutAlt />, action: handleLogout },
  ];

  return (
    <div className="sidebar-wrapper text-xl font-semibold font-serif z-10">
      {/* Sidebar for Large Screens */}
      <div
        className={`sidebar fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20 transition-transform duration-300 transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <ul className="space-y-4 pt-10">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={item.action ? item.action : () => navigate(item.route)}
              className="menu-item flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-100 rounded-lg"
            >
              <i className="icon">{item.icon}</i>
              <span>{item.label}</span>
            </li>
          ))}
          <li
            onClick={openModal}
            className="menu-item flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-100 rounded-lg"
          >
            <i className="icon"><FaFolderOpen /></i>
            <span>Logo</span>
          </li>
        </ul>
      </div>

      {/* Menu Bar Icon for Small Screens */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-gray-800 text-white rounded-full"
        onClick={toggleSidebar}>
        <i className="icon"><FaBars /></i>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (logo.length > 0) {
                  updateLogo(); // Update logo if it already exists
                } else {
                  createLogo(); // Create a new logo if none exists
                }
                closeModal(); // Close the modal after submission
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" htmlFor="logoUpload">
                  Upload Logo
                </label>
                <input
                  type="file"
                  id="logoUpload"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files[0])}
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex justify-between items-center gap-5">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {logo.length > 0 ? "Update Logo" : "Upload Logo"}
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Close Modal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
