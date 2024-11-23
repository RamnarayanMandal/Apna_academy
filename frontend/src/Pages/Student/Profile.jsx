import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { StudentSideBar } from './StudentSidebar';
import { useTheme } from '../../ThemeProvider';
import { FaProductHunt } from 'react-icons/fa';
import UpdateStudent from './UpdateStudent'; // Import the UpdateStudent component

const BASE_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to control showing the UpdateStudent form
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/student/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>No profile data found</div>;
  }

  // Extracting profile data, and using dummy data where necessary
  const { name, email, phone } = profileData;

  // Dummy data for missing fields
  const profilePicture = 'https://via.placeholder.com/150'; // Placeholder image
  const address = '1234, Some Street, City, Country'; // Dummy address
  const dateOfBirth = '1990-01-01'; // Dummy date of birth
  const gender = 'Male'; // Dummy gender

  // Dummy statistics for the grid section
  const totalOrders = 50;
  const confirmedOrders = 40;
  const deliveredOrders = 30;

  const handleEditProfile = () => {
    setShowUpdateForm(true); // Show the UpdateStudent form when the button is clicked
  };

  return (
    <div className={`min-h-screen flex  lg:gap-20 w-full font-sans ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-blue-100 text-gray-900'} min-h-screen`}>
      <div >
        <StudentSideBar />
      </div>
      
      <div className="  flex justify-center items-center flex-col h-full px-5">
        <div className="flex justify-center items-center content-center pt-10">
          <div className="grid grid-cols-1 gap-4 p-5">
            <div className="flex flex-col items-center mb-4">
              <img
                className="w-44 h-44 rounded-full object-cover mb-4"
                src={profilePicture} // Use actual profile picture here
                alt="Avatar"
              />
            </div>

            {/* Grid with dummy statistics */}
            <div className='lg:grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mb-6'>
              <div className="w-full rounded-lg h-32 bg-blue-800 p-5 mb-4">
                <h1 className="text-white text-2xl text-center font-semibold">
                  <p>Total Orders</p>
                  <div className="flex justify-center content-center items-center px-2 py-2 text-4xl flex gap-2">
                    <FaProductHunt /> <p className="text-3xl">{totalOrders}</p>
                  </div>
                </h1>
              </div>
              <div className="w-full rounded-lg h-32 bg-blue-800 p-5 mb-4">
                <h1 className="text-white text-2xl text-center font-semibold">
                  <p>Confirmed Orders</p>
                  <div className="flex justify-center content-center items-center px-2 py-2 text-4xl flex gap-2">
                    <FaProductHunt /> <p className="text-3xl">{confirmedOrders}</p>
                  </div>
                </h1>
              </div>
              <div className="w-full rounded-lg h-32 bg-blue-800 p-5 mb-4">
                <h1 className="text-white text-2xl text-center font-semibold">
                  <p>Delivered Orders</p>
                  <div className="flex justify-center content-center items-center px-2 py-2 text-4xl flex gap-2">
                    <FaProductHunt /> <p className="text-3xl">{deliveredOrders}</p>
                  </div>
                </h1>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-bold mb-2 text-center my-4">Profile Details</h2>
              <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 border-2 border-red-600 p-4 rounded-md my-4'>
                <p><strong>Username:</strong> {name || 'John Doe'}</p>
                <p><strong>Email:</strong> {email || 'johndoe@example.com'}</p>
                <p><strong>Phone Number:</strong> {phone || '+1 234 567 890'}</p>
                <p><strong>Address:</strong> {address}</p>
                <p><strong>Date of Birth:</strong> {new Date(dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Gender:</strong> {gender}</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleEditProfile}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {showUpdateForm && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
    <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-lg w-full sm:w-96">
      <UpdateStudent
        studentData={profileData} // Pass the profile data to the form
        setShowModal={setShowUpdateForm} // Function to close the form
      />
    </div>
  </div>
)}


    </div>
  );
};

export default Profile;
