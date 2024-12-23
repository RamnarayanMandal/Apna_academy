import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddAnnouncement from './AddAnnouncement';  // Import AddAnnouncement component
import AdminSidebar from '../AdminSidebar'; // Assuming you have this component for the sidebar
import { useTheme } from '../../../ThemeProvider';

const BASE_URL = import.meta.env.VITE_API_URL;

const GetAllAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/announcement`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const fetchedAnnouncements = response.data;

          // Filter announcements to get those from the last 30 days
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

          const filteredAnnouncements = fetchedAnnouncements.filter((announcement) => {
            const createdAt = new Date(announcement.createdAt);
            return createdAt >= thirtyDaysAgo;
          });

          setAnnouncements(filteredAnnouncements);
        }
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to fetch announcements. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []); // Empty dependency array to run only once on mount

  // Handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex min-h-screen`}>
      {/* Sidebar - Positioned on the left */}
      <div className="w-64 min-h-screen text-white">
        <AdminSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6 relative">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className={`${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-500 text-white'} absolute top-4 left-4 px-4 py-2 rounded hover:bg-gray-700`}
        >
          Back
        </button>

        {/* Button to trigger Add Announcement modal */}
        <button
          onClick={openModal}
          className={`${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} absolute top-4 right-4 px-4 py-2 rounded hover:bg-blue-700`}
        >
          Add Announcement
        </button>

        <h2 className="text-2xl font-bold m-12">Announcements from the Last 30 Days</h2>
        {announcements.length === 0 ? (
          <p>No announcements found from the last 30 days.</p>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 border rounded-lg`}
              >
                <p className="text-lg font-semibold">Admin ID: {announcement.adminId}</p>
                <p className="text-sm text-gray-700">
                  Role: {announcement.roles.length <= 1
                    ? announcement.roles[0]
                    : `${announcement.roles[0]} and ${announcement.roles[1]}`}
                </p>
                <p className="text-gray-700 mt-2">{announcement.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Created At: {new Date(announcement.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

        )}

        {/* Modal for Add Announcement Form */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg w-96 relative`}>
              <button
                onClick={closeModal}
                className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} absolute top-2 right-2 hover:text-gray-800`}
              >
                <span className="text-2xl">×</span>
              </button>
              <AddAnnouncement closeModal={closeModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllAnnouncement;
