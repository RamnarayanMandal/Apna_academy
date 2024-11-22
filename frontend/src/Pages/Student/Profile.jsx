import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // or fetch if you prefer
const BASE_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  // Extract studentId from URL parameters
  const { id } = useParams();
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  // Fetch profile data when the component is mounted
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`${BASE_URL}/api/student/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });
        console.log("Profile   ", response.data);
        setProfileData(response.data); 
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]); // Re-fetch data when the id changes

  // Return loading state if data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  // Return if there's no profile data
  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No profile data found</p>
      </div>
    );
  }

  const {
    name,
    email,
    phone,
    address,
    profilePicture,
    dateOfBirth,
    gender,
  } = profileData;


  const handleEditProfile = () => {
    navigate(`/Update-Student/${id}`); // Navigate to the update page with student ID
  };


  return (
  
     <div className="flex justify-center  items-center w-96">
      <div className="bg-white rounded-lg shadow-lg w-full ">
        {/* Profile Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-700">Profile</h1>
          <div className="flex items-center space-x-4">
            <img
              src={profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <h2 className="text-xl font-medium text-gray-700">{name}</h2>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Phone:</span>
            <span className="text-sm text-gray-800">{phone}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Address:</span>
            <span className="text-sm text-gray-800">{address}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Date of Birth:</span>
            <span className="text-sm text-gray-800">{new Date(dateOfBirth).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Gender:</span>
            <span className="text-sm text-gray-800">{gender}</span>
          </div>
        </div>

        {/* Optional: Edit Profile button */}
        <div className="flex justify-center">
          <button onClick={handleEditProfile}  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
   
  );
};

export default Profile;
