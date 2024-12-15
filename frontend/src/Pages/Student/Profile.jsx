import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io'; // Cross icon
import { StudentSideBar } from './StudentSidebar';
import { useTheme } from '../../ThemeProvider';
import UpdateStudent from './UpdateStudent'; // Import the UpdateStudent component
import studentImage from '../../assets/BoyGirl.jfif'; // Image for the profile page
import { TeacherSideBar } from '../Teacher/TeacherSideBar';
import AdminSidebar from '../Admin/AdminSidebar';

const BASE_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const studentId = localStorage.getItem('CurrentUserId');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to control showing the UpdateStudent form
  const [showAllCarts, setShowAllCarts] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [myCourses, setMyCourses] = useState([]);
  const role = localStorage.getItem('role');

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

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/course/getAllCourses/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyCourses(response.data || []);
      } catch (error) {
        console.error('Error fetching student courses:', error);
      }
    };
    fetchMyCourses();
  }, [studentId]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (!profileData) {
    return <div className="text-center text-xl">No profile data found</div>;
  }

  const { name, email, address, dateOfBirth, gender, phone, profilePicture, createdAt } = profileData;
  const creationDate = new Date(createdAt).toLocaleDateString();

  const handleEditProfile = () => {
    setShowUpdateForm(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowUpdateForm(false); // Close the modal
  };

  const handleViewCourse = (courseId) => {
    navigate(`/student/Mycourses/${courseId}`);
  };

  const handleSeeAllClick = () => {
    setShowAllCarts(!showAllCarts);
  };

  const renderSidebar = () => {
    if (role === 'teacher') return <TeacherSideBar />;
    if (role === 'admin') return <AdminSidebar />;
    return <StudentSideBar />;
  };

  return (
    <div
      className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
        }`}
    >
      {/* Sidebar */}
      <div className="fixed z-40">
        {renderSidebar()}
      </div>

      {/* Main content */}
      <div className="flex-1 p-4  lg:ml-72 ml-24">
        {/* Modal for UpdateStudent */}
        {showUpdateForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg w-1/3 relative">
              <UpdateStudent profileData={profileData} setShowModal={handleCloseModal} />
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                <IoMdClose className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Profile Header */}
        <div
          className={`mt-8 p-6 rounded-lg flex-1 justify-center `}
        >
          <div className='flex flex-col flex-wrap justify-center items-center content-center'>
            <img
              className="w-40 h-40 rounded-full object-cover"
              src={profilePicture || studentImage}
              alt="Profile"
            />

            {role === 'student' && (
              <button
                onClick={handleEditProfile}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </div>
          <div className='flex flex-col flex-wrap justify-center items-center content-center my-4'>
            <p className="text-lg font-semibold">Account Created: {creationDate}</p>
            <h3 className="text-2xl font-bold">Welcome back, {name}!</h3>
            <p>Always stay updated with your Student Portal</p>
          </div>

        </div>

        {/* Personal Information */}
        <div
          className={`mt-8 p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'
            } flex`}
        >



          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
            <p>
              <span className="font-semibold">Date of Birth:</span> {new Date(dateOfBirth).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {gender}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {phone}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {address}
            </p>
          </div>
        </div>


        {/* Enrolled Courses */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Enrolled Courses</h3>
            <button
              onClick={handleSeeAllClick}
              className="text-blue-500 hover:text-blue-700"
            >
              {showAllCarts ? 'See Less' : 'See All'}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {myCourses.length > 0 ? (
              myCourses.slice(0, showAllCarts ? myCourses.length : 3).map((course) => (
                <div
                  key={course.id}
                  className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}
                >
                  <h4 className="text-lg font-bold text-center">{course.courseName}</h4>
                 <div className='flex justify-center items-center content-center'>
                 <button
                    onClick={() => handleViewCourse(course.id)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                 </div>
                </div>
              ))
            ) : (
              <p>No courses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
